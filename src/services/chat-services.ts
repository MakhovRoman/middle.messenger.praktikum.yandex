import { Dispatch } from 'core/Store';
import { AppState, User } from '../../typings/app';
import apiHasError from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';
import chatAPI from 'api/chatsAPI';
import authAPI from 'api/authAPI';
import URL from '../api/urls';
import usersAPI from 'api/usersAPI';
import { text } from 'stream/consumers';

type T = Record<string, unknown>;

export const createChat = async(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: string
) => {
    dispatch({isLoading: true});

    const createChat = await chatAPI.createChat(data)  as XMLHttpRequest;

    if (apiHasError(createChat)) {
        dispatch({isLoading: false, loginFormError: createChat.response.reason});
        return;
    }

    const getChat = await chatAPI.getChats() as XMLHttpRequest;

    if (apiHasError(getChat)) {
        dispatch({isLoading: false, loginFormError: getChat.response.reason});
        return;
    }

    // const chatsArr: T[] = getChat.response;
    // const chatObj = chatsArr.reduce((result, item, index) => {
    //     result[index] = item;

    //     if ((result[index] as T).avatar) {
    //         (result[index] as T).avatar = `${URL.RESOURCES}${(result[index] as T).avatar}`;
    //     } else {
    //         (result[index] as T).avatar = 'https://img.icons8.com/ios/50/null/icq.png';
    //     }

    //     return result;
    // }, {});

    dispatch({chats: getChat.response});
    // console.log(chatsArr, chatObj);
}

export const addUsers = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: {
        chatId: number,
        login: string
    }
) => {
    const searchUser = await usersAPI.searchUser(data.login) as XMLHttpRequest;

    dispatch({loginFormError: null});

    if (apiHasError(searchUser)) {
        dispatch({loginFormError: searchUser.reason});
        return;
    }

    const userId = searchUser.response[0].id;
    console.log(userId);

    const addUser = await chatAPI.addUsersToChat(data.chatId, userId);
    if (apiHasError(addUser)) {
        dispatch({loginFormError: addUser.reason});
        return;
    }
    console.log(`user ${data.login} add to chat ${data.chatId}`);
}

export const removeUsers = async(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: {
        chatId: number,
        login: string
    }
) => {
    const searchUser = await usersAPI.searchUser(data.login) as XMLHttpRequest;

    dispatch({loginFormError: null});

    if (apiHasError(searchUser)) {
        dispatch({loginFormError: searchUser.reason});
        return;
    }

    const userId = searchUser.response[0].id;
    console.log(userId);

    const removeUser = await chatAPI.deleteUsersFromChat(data.chatId, userId);
    if (apiHasError(removeUser)) {
        dispatch({loginFormError: removeUser.reason});
        return;
    }
    console.log(`user ${data.login} remove from chat ${data.chatId}`);
}

export const openChat = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    chatId: number
) => {
    const getToken = await chatAPI.getTokenChat(chatId) as XMLHttpRequest;
    console.log();
    if (getToken.status === 200) {
        const {token} = getToken.response;
        console.log(token);
        window.store.dispatch({socket: null});
        const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${window.store.getState().user.id}/${chatId}/${token}`);
        window.store.dispatch({socket: socket});

        let timer: NodeJS.Timer;

        socket.addEventListener('open', () => {
            console.log('connected');

            socket.send(JSON.stringify({
                content: '0',
                type: 'get old',
            }));


            timer = setInterval(() => {
                socket.send(JSON.stringify({
                    type: 'ping'
                }));
            }, 50000)
        });

        socket.addEventListener('close', (event) => {
            clearInterval(timer);
            window.store.dispatch({currentChat: null});

            const chatList = document.querySelectorAll('.chat__item') as NodeList;
            chatList.forEach((item) => {
                if ((item as HTMLElement).classList.contains('chat__item_active')) {
                    (item as HTMLElement).classList.remove('chat__item_active') ;
                }
            });

            //TODO: Delete messages

            if(event.wasClean) {
                console.log('Connection closed cleanly');
            } else {
                console.log('Lost connection');
            }

            console.log(`Code: ${event.code}`);
        });

        socket.addEventListener('message', (event) => {

            const data = JSON.parse(event.data);
            console.log(data);
            if(data.type && data.type === 'error') {
                return;
            }

            if(data.length) {
                // const chatId = data[0].chat_id;
                const chatId = window.store.getState().currentChat;
                const chats = window.store.getState().chats;

                if (chats) {
                    for(const key in chats) {
                        if(chats[key].id === chatId) {
                            const userId = window.store.getState().user.id;

                            const chatElement = document.querySelector(`[data-id="${chatId}"]`) as HTMLElement;

                            const chatElementTextArea = chatElement.querySelector('.chat__info-message > p') as HTMLElement;
                            console.log(chatElementTextArea)
                            chatElementTextArea.textContent = data[0].content;

                            const textArea = document.querySelector('#chat__dialog-write') as HTMLInputElement;
                            textArea.value = '';

                            const messageContent = data.reduceRight((res: any, item: any) => {
                                const dateArea = item.time;
                                const date = new Date(item.time).toLocaleDateString();
                                const time = new Date(item.time).toLocaleTimeString().slice(0, -3);

                                if (res[date]) {
                                    if(userId === item.user_id) {
                                        res[date][Math.abs(item.id - data.length)] = {
                                            myContent: item.content,
                                            dateArea,
                                            time,
                                        };
                                    } else {
                                        res[date][Math.abs(item.id - data.length)] = {
                                            alienContent: item.content,
                                            dateArea,
                                            time,
                                        };
                                    }
                                } else if (userId === item.user_id) {
                                    res[date] = {
                                        [Math.abs(item.id - data.length)]: {
                                            myContent: item.content,
                                            dateArea,
                                            time,
                                        }
                                    };
                                } else {
                                    res[date] = {
                                        [Math.abs(item.id - data.length)]: {
                                            alienContent: item.content,
                                            dateArea,
                                            time,
                                        }
                                    };
                                }

                                return res;
                            }, {});

                            const result: any = {};
                            for(const key in messageContent) {
                                result[key] = {date: key, messages: messageContent[key]};
                            }

                            window.store.dispatch({messageContent: null});
                            window.store.dispatch({messageContent: result});

                            const chatDialogContent = document.querySelector('.chat__dialog-content') as HTMLElement;
                            chatDialogContent.scrollTop = chatDialogContent.scrollHeight;
                        }
                    }
                } else {
                    window.store.dispatch({messageContent: null});
                }
            } else {
                window.store.dispatch({messageContent: null});
            }
        });

        socket.addEventListener('error', () => {
            window.store.dispatch({currentChat: null});

            const chatList = document.querySelectorAll('.chat__item') as NodeList;
            chatList.forEach((item) => {
                if ((item as HTMLElement).classList.contains('chat__item_active')) {
                    (item as HTMLElement).classList.remove('chat__item_active') ;
                }
            });

            window.store.dispatch({disableMeetingScreen: ''});
            window.store.dispatch({chatDialogContent: ''});

            console.log('Error connection');
        });

        window.store.dispatch({socket: socket});
    }
}
