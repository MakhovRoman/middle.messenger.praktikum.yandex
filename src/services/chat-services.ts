import { DispatchStateHandler } from '../../typings/app';
import apiHasError from 'helpers/apiHasError';
import chatAPI from 'api/chatsAPI';
import usersAPI from 'api/usersAPI';
import { checkActiveChat } from 'helpers/checkActiveChat';
import hasError from 'helpers/apiHasError';

type ChatCreatePayload = {
    data: string
}

export const createChat:DispatchStateHandler<ChatCreatePayload> = async(
    dispatch,
    state,
    data
) => {
    try{
        dispatch({isLoading: true});

        const createChat = await chatAPI.createChat(data as unknown as string)  as XMLHttpRequest;

        if (apiHasError(createChat)) {
            dispatch({isLoading: false, loginFormError: createChat.response.reason});
            return;
        }

        const getChat = await chatAPI.getChats() as XMLHttpRequest;

        if (apiHasError(getChat)) {
            dispatch({isLoading: false, loginFormError: getChat.response.reason});
            return;
        }
        dispatch({chats: getChat.response});
    } catch(error) {
        console.log(error);
    }
}

type ChatRemovePayload = {
    data: number
}

export const removeChat: DispatchStateHandler<ChatRemovePayload> = async(
    dispatch,
    state,
    data
) => {
    try {
        dispatch({isLoading: true});

        const deleteCH = await chatAPI.deleteChat(Number(data)) as XMLHttpRequest;
        if (hasError(deleteCH)) {
            dispatch({isLoading: false, loginFormError: deleteCH.response.reason});
            return;
        } else {
            console.log(`delete chat #${data}`);
        }

        const getChat = await chatAPI.getChats() as XMLHttpRequest;

        if (apiHasError(getChat)) {
            dispatch({isLoading: false, loginFormError: getChat.response.reason});
            return;
        }

        dispatch({
            chats: getChat.response,
            chatDialogCompanion: '',
            chatDialogContent: '',
            currentChat: null,
            currentChatAvatar: '',
            currentChatTitle: '',
            toolsActive: '',
            disableMeetingScreen: ''
        });
    } catch(err) {
        console.log(err);
    }

}

type UserActionsPayload = {
    chatId: number;
    login: string;
    data: {
        chatId: number,
        login: string
    }
}

export const addUsers: DispatchStateHandler<UserActionsPayload> = async (
    dispatch,
    state,
    data
) => {
    try{
        const searchUser = await usersAPI.searchUser(data.login) as XMLHttpRequest;

        dispatch({loginFormError: null});

        if (apiHasError(searchUser)) {
            dispatch({loginFormError: searchUser.reason});
            return;
        }

        const userId = searchUser.response[0].id;

        const addUser = await chatAPI.addUsersToChat(data.chatId, userId);
        if (apiHasError(addUser)) {
            dispatch({loginFormError: addUser.reason});
            return;
        }
        console.log(`user ${data.login} add to chat ${data.chatId}`);
    } catch (err) {
        console.log(err);
    }
}

export const removeUsers: DispatchStateHandler<UserActionsPayload> = async(
    dispatch,
    state,
    data
) => {
    try {
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
    } catch(err) {
        console.log(err);
    }
}

type OpenChatPayload = {
    chatId: number
}

export const openChat: DispatchStateHandler<OpenChatPayload> = async (
    dispatch,
    state,
    chatId
) => {
    try {
        const getToken = await chatAPI.getTokenChat(chatId as unknown as number) as XMLHttpRequest;

        if (getToken.status === 200) {
            const {token} = getToken.response;
            window.store.dispatch({socket: null});

            // eslint-disable-next-line max-len
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

                window.store.dispatch({
                    chatDialogCompanion: '',
                    chatDialogContent: '',
                    disableMeetingScreen: ''
                })

                if(event.wasClean) {
                    console.log('Connection closed cleanly');
                } else {
                    console.log('Lost connection');
                }

                console.log(`Code: ${event.code}`);
            });

            socket.addEventListener('message', (event) => {

                const data = JSON.parse(event.data);

                if(data.type && data.type === 'error') {
                    return;
                }

                if (!Array.isArray(data)) {
                    return;
                }

                if(data.length) {
                    const chatId = window.store.getState().currentChat;
                    const chats = window.store.getState().chats;

                    if (chats) {
                        for(const key in chats) {
                            if(chats[key].id === chatId) {
                                const userId = window.store.getState().user.id;

                                const chatElement = document.querySelector(`[data-id="${chatId}"]`) as HTMLElement;

                                const chatElementTextArea = chatElement.querySelector('.chat__info-message > p') as HTMLElement;
                                chatElementTextArea.textContent = data[0]?.content;

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

                                checkActiveChat();

                                const chatDialogContent = document.querySelector('.chat__dialog-content') as HTMLElement;
                                chatDialogContent.scrollTop = chatDialogContent.scrollHeight;
                            }
                        }
                    } else {
                        window.store.dispatch({messageContent: null});
                    }
                } else {
                    window.store.dispatch({
                        messageContent: null,
                    });
                }

                checkActiveChat();
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

            window.store.dispatch({socket: null});
            window.store.dispatch({socket: socket});
        }
    } catch(err) {
        console.log(err);
    }
}
