import Block from 'core/Block';
import { CoreRouter } from 'core/Router/CoreRouter';
import { Store } from 'core/Store';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { AppState } from '../../../typings/app';
import { withUser } from 'helpers/withUser';
import { addUsers, createChat, openChat, removeUsers } from 'services/chat-services';
import { withChats } from 'helpers/withChats';
import { ChatItem } from 'components';
import chatItem from 'components/chat-item';
import { trim } from 'helpers/trim';
import { threadId } from 'worker_threads';

type DataType = {
    title: HTMLElement | null,
    avatar: HTMLElement | null
}

type ChatItemProps = {
    avatar: Nullable<string>,
    created_by: number,
    id: number,
    last_message: Nullable<string>,
    title: string,
    unread_count: number
}

type ChatProps = {
    router: CoreRouter;
    store: Store<AppState>;
    chatList: ChatItemProps[];
    userList: Record<string, unknown>[];
    modalChecked?: string;
    searchValue?: string;
    searchAutofocus?: boolean;
    messagesContent: Record<string, unknown> [];
    disableMeetingScreen: string;
    currentChatAvatar?: string;
    currentChatTitle?: string;
    // onClickTop: (e: Event) => void,
    // onClickBot: (e: Event) => void,
    // onCheck: (e: Event) => void,
    // onSubmit: (e: Event) => void,
    // goToProfile: () => void
}

declare global {
    interface Window {
      handleChats: (id: number)=> void;
    }
}

window.handleChats = function (id: number) {
    this.store.dispatch({
        toolsActive: 'chat__dialog-content_active',
        currentChat: id,
        disableMeetingScreen: 'chats__meeting-wrapper_disable',
        chatDialogContent: 'chat__dialog-content_active',
        chatDialogCompanion: 'chat__dialog-companion_active'
    });

    this.store.dispatch(openChat, id);

    const chatList = document.querySelectorAll('.chat__item') as NodeList;
        const dialogCompanion = document.querySelector('.chat__dialog-companion');
        const chatMeeting = document.querySelector('.chats__meeting-wrapper');
        const dialogCompanionData: DataType = {
            title: dialogCompanion!.querySelector('.chat__dialog-name'),
            avatar: dialogCompanion!.querySelector('.chat__avatar-content'),
        };
        const chatDialog = document.querySelector('.chat__dialog-content');
        const submitButton = document.querySelector('.popup_add button[type="submit"]') as HTMLElement;
        const tools = document.querySelector('.chat__dialog-tools') as HTMLElement;

        //выделение активного чата
        chatList?.forEach((item) => {
            const currentElData: DataType = {
                title: (item as HTMLElement).querySelector('.chat__info-title > h3'),
                avatar: (item as HTMLElement).querySelector('.chat__avatar-content img'),
            };

            if ((item as HTMLElement).dataset.id === id.toString()) {
                (item as HTMLElement).classList.add('chat__item_active');
                (chatMeeting as HTMLElement).style.display = 'none';
                (chatDialog as HTMLElement).classList.add('chat__dialog-content_active');
                submitButton.dataset.id=`${id}`;

                if (!tools.classList.contains('chat__dialog-tools_active')) {
                    tools.classList.add('chat__dialog-tools_active');
                }

                if (dialogCompanionData.title && currentElData.title) {
                    // dialogCompanionData.title.textContent =currentElData.title.textContent;
                    window.store.dispatch({currentChatTitle: currentElData.title.textContent})
                }


                if (dialogCompanionData.avatar && currentElData.avatar) {
                    // dialogCompanionData.avatar.innerHTML = currentElData.avatar.innerHTML;
                    window.store.dispatch({currentChatAvatar: currentElData.avatar.getAttribute('src')})
                }
            } else {
                if ((item as HTMLElement).classList.contains('chat__item_active')) {
                    (item as HTMLElement).classList.remove('chat__item_active');
                }
            }
        });

    setTimeout(() => {
        //выделение активного чата
        chatList?.forEach((item) => {
            if ((item as HTMLElement).dataset.id === id.toString()) {
                (item as HTMLElement).classList.add('chat__item_active');
                (chatMeeting as HTMLElement).style.display = 'none';
                (chatDialog as HTMLElement).classList.add('chat__dialog-content_active');
                submitButton.dataset.id=`${id}`;

                if (!tools.classList.contains('chat__dialog-tools_active')) {
                    tools.classList.add('chat__dialog-tools_active');
                }

            } else {
                if ((item as HTMLElement).classList.contains('chat__item_active')) {
                    (item as HTMLElement).classList.remove('chat__item_active');
                }
            }
        });

    }, 300)


}


// const fromChatToProfile = document.querySelector('#from-chat-to-profile');
// fromChatToProfile?.addEventListener('click', (event: Event) => {
//     event.preventDefault();
//     console.log('gggg');

//     window.router.go('/profile');
// })


// function showCurrentChat(e: Event) {
//     e.stopPropagation()

//     const chatArray: HTMLElement[] = Array.from(document.querySelectorAll('.chat__item'));
//     const chatMeeting = document.querySelector('.chats__meeting-wrapper');
//     const chatDialog = document.querySelector('.chat__dialog-content');
//     const dialogCompanion = document.querySelector('.chat__dialog-companion');

//     // в дальнейшем с помощью этого индекса буду выбирать контент чатов из массива
//     let currentNumber: number;
//     let currentEl = e.target;
//     const currentElData: DataType = {
//         title: (currentEl as HTMLElement).querySelector('.chat__info-title > h3'),
//         avatar: (currentEl as HTMLElement).querySelector('.chat__avatar-content'),
//     };
//     const dialogCompanionData: DataType = {
//         title: dialogCompanion!.querySelector('.chat__dialog-name'),
//         avatar: dialogCompanion!.querySelector('.chat__avatar-content'),
//     };

//     for(let i = 0; i < chatArray.length; i++) {
//         if (chatArray[i].classList.contains('chat__item_active')) {
//             chatArray[i].classList.remove('chat__item_active');
//         }
//         if (currentEl == chatArray[i]) currentNumber = i;
//     };

//     // отображение выбранного чата и диалога
//     (currentEl as HTMLElement).classList.add('chat__item_active');
//     (chatMeeting as HTMLElement).style.display = 'none';
//     (chatDialog as HTMLElement).classList.add('chat__dialog-content_active');

//     //вывод аватара и имени собеседника в top
//     if (dialogCompanionData.title && currentElData.title) {
//         dialogCompanionData.title.textContent =currentElData.title.textContent;
//     }
//     if (dialogCompanionData.avatar && currentElData.avatar) {
//         dialogCompanionData.avatar.innerHTML = currentElData.avatar.innerHTML;
//     }
// }

export class Chats extends Block {
    static cName = 'Chats';

    constructor(props: ChatProps) {
        super(props);

        this.setProps({
            chatList: () => window.store.getState().chats,
            userList: () => window.store.getState().userList,
            modalChecked: '',
            searchAutofocus: 'autofocus',
            toolsActive: () => window.store.getState().toolsActive,
            disableMeetingScreen: () => window.store.getState().disableMeetingScreen,
            messageContent: () => window.store.getState().messageContent,
            chatDialogContent: () => window.store.getState().chatDialogContent,
            currentChatTitle: () => window.store.getState().currentChatTitle,
            currentChatAvatar: () => window.store.getState().currentChatAvatar,
            chatDialogCompanion: () => window.store.getState().chatDialogCompanion,
        })
    }


    componentDidUpdate() {
        return window.store.getState().screen === 'chat';
    }

    // onClickTop(e: Event) {
    //     let target = document.querySelector('.dialog-tools__button');
    //     let target2 = document.querySelector('.dialog-tools__button img');

    //     if (target == e.target || target2 == e.target) {
    //         const modal = document.getElementById('modal-add-user');
    //         modal?.classList.toggle('chat__modal-tools_active');
    //     }
    // }

    // onClickBot(e: Event) {
    //     let target = document.querySelector('.dialog-attach__icon img');

    //     if (target == e.target) {
    //         const modal = document.getElementById('modal-attach');
    //         modal?.classList.toggle('chat__modal-attach_active');
    //     }
    // }

    // onSubmit(e: Event) {
    //     e.preventDefault();

    //     const form = document.querySelector('form[name="send-message"]');
    //     const inputs = Array.from(form!.querySelectorAll('input'));
    //     const message = document.getElementById('chat__dialog-write');

    //     const result:any = {};

    //     for (let i = 0; i < inputs!.length; i++) {
    //         result[inputs![i].name] = inputs![i].value;
    //     }

    //     if ((message as HTMLInputElement).value) {
    //         console.log(result);
    //     }

    // }

    // onCheck(e: Event) {
    //     console.log('gggg')
    //     showCurrentChat(e);
    // }

    // goToProfile() {
    //     console.log('ggg');
    //     this.props.router.go('/profile');
    // }




    protected getStateFromProps() {
        this.state = {
            goToProfile: () => {
                this.props.router.go('/profile');
            },

           onCheck: (e: Event) => {
                // showCurrentChat(e);
                console.log('gggg')
           },

           onSubmit: (e: Event) => {
                e.preventDefault();

                const form = document.querySelector('form[name="send-message"]');
                const inputs = Array.from(form!.querySelectorAll('input'));
                const message = document.getElementById('chat__dialog-write');

                const result:any = {};

                for (let i = 0; i < inputs!.length; i++) {
                    result[inputs![i].name] = inputs![i].value;
                }

                if ((message as HTMLInputElement).value) {
                    console.log(result);
                }

            },

            onClickBot: (e: Event) => {
                let target = document.querySelector('.dialog-attach__icon img');

                if (target == e.target) {
                    const modal = document.getElementById('modal-attach');
                    modal?.classList.toggle('chat__modal-attach_active');
                }
            },

            onSendMessage: (e: Event) => {
                e.preventDefault();

                const message = (document.querySelector('#chat__dialog-write') as HTMLInputElement).value.toString().trim();
                if (message && message.length > 0) {
                    const {socket} = this.props.store.getState();
                    if (socket instanceof WebSocket) {
                        socket.send(JSON.stringify({
                            content: message,
                            type: 'message'
                        }));
                        socket.send(JSON.stringify({
                            content:'0',
                            type: 'get old'
                        }));
                    }
                }
            },

            onClickTop: (e: Event) => {
                let target = document.querySelector('.dialog-tools__button');
                let target2 = document.querySelector('.dialog-tools__button img');

                if (target == e.target || target2 == e.target) {
                    const modal = document.getElementById('modal-add-user');
                    modal?.classList.toggle('chat__modal-tools_active');
                }
            },

            createChat: (e: Event) => {
                e.preventDefault();
                const title = (document.querySelector('#chat-name') as HTMLInputElement).value;
                const input = (document.querySelector('#popup-create') as HTMLInputElement);

                input.checked = false;
                this.props.store.dispatch(createChat, title);

                setTimeout(() => {
                    this.setProps({
                        chatList: window.store.getState().chats
                    })
                }, 1000)
            },

            addUser: (e: Event) => {
                e.preventDefault();
                const login = (document.querySelector('#add-user') as HTMLInputElement).value;

                // const modalSearch = document.querySelector('#popup-add') as HTMLInputElement;
                const submitButton = document.querySelector('.popup_add button[type="submit"]') as HTMLElement;
                // const chatId = submitButton.dataset.id;
                const chatId = this.props.store.getState().currentChat;
                this.props.store.dispatch(addUsers, {login: login, chatId: chatId});

                const checkbox = document.querySelector('#popup-add') as HTMLInputElement;
                const modalTools = document.querySelector('#modal-add-user') as HTMLInputElement;

                checkbox.checked = false;
                if (modalTools.classList.contains('chat__modal-tools_active')) {
                    modalTools.classList.remove('chat__modal-tools_active');
                }
                // setTimeout(() => {
                //     this.setProps({
                //         userList: window.store.getState().userList,
                //         searchValue: login,
                //         modalChecked: 'checked'
                //     });
                //     console.log('after 200ms');

                // }, 200);
            },

            removeUser: (e: Event) => {
                e.preventDefault();

                const login = (document.querySelector('#remove-user') as HTMLInputElement).value;

                const submitButton = (document.querySelector('.popup_remove button[type="submit"]') as HTMLElement);
                const chatId = this.props.store.getState().currentChat;
                this.props.store.dispatch(removeUsers, {login: login, chatId: chatId});

                const checkbox = document.querySelector('#popup-remove') as HTMLInputElement;
                const modalTools = document.querySelector('#modal-add-user') as HTMLInputElement;

                checkbox.checked = false;
                if (modalTools.classList.contains('chat__modal-tools_active')) {
                    modalTools.classList.remove('chat__modal-tools_active');
                }
            },

            clickChat: (e: Event, id: number) => {
                console.log('ggg')
            }
        }
    }

    protected render() {
        console.log('%c render chat ', 'background: green; color: white');

        return `
            <section class="chats">
                <div class="chats__left-column">
                    <div class="chats__top">
                        <div class="chats__go-to-profile">
                        {{{ChatCreate

                        }}}
                            {{{GoToProfile
                                goToProfile=goToProfile
                            }}}
                        </div>
                        <div class="chats__search">
                            <input type="text" id="chat-search" placeholder="Поиск">
                            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M7.59239 8.41382C6.16047 9.84574 3.83886
                                9.84574 2.40694 8.41382C0.975017 6.9819 0.975017 4.6603 2.40694 3.22837C3.83886 1.79645
                                6.16047 1.79645 7.59239 3.22837C9.02431 4.6603 9.02431 6.9819 7.59239 8.41382ZM8.03277
                                9.79678C6.07255 11.2962 3.25696 11.1495 1.46413 9.35663C-0.488491 7.40401 -0.488491
                                4.23819 1.46413 2.28556C3.41675 0.332943 6.58258 0.332943 8.5352 2.28556C10.3279
                                4.07831 10.4747 6.89373 8.97555 8.85394L12.5423 12.4206L11.5994 13.3635L8.03277
                                9.79678Z" fill="#999999"/>
                            </svg>
                        </div>
                    </div>
                    <div class="chat-list custom-scrollbar">
                    {{#each chatList}}
                        <div class="chat__item" data-id={{id}}  onclick='handleChats({{id}})'>
                            <div class="chat__item-container">
                                <div class="chat__avatar-wrapper">
                                    <div class="chat__avatar-content">
                                        {{#if avatar}}
                                        <img src="{{avatar}}" alt="Аватар">
                                        {{else}}
                                        <img src='https://www.svgrepo.com/download/5158/chat.svg' alt="Аватар">
                                        {{/if}}
                                    </div>
                                </div>
                                <div class="chat__info">
                                    <div class="chat__info-top chat__info-row">
                                        <div class="chat__info-title">
                                            <h3>{{title}}</h3>
                                        </div>
                                        <div class="chat__info-date">
                                            <span>12:00</span>
                                        </div>
                                    </div>
                                    <div class="chat__info-bot chat__info-row">

                                        <div class="chat__info-message">
                                            <p>{{last_message.content}}</p>
                                        </div>

                                        {{#if unread_message}}
                                        <div class="chat__info-unread">
                                            <span>{{unread_message}}</span>
                                        </div>
                                        {{/if}}
                                    </div>
                                </div>
                            </div>
                         </div>
                    {{/each}}
                    </div>
                </div>
                <div class="chats__right-column">
                    <div class="chat__dialog">
                        <div class="chat__dialog-container">
                            {{{ChatDialogTop
                                onClick=onClickTop
                                add_user_modal=add_user_modal
                                toolsActive=toolsActive
                                currentChatAvatar=currentChatAvatar
                                currentChatTitle=currentChatTitle
                                chatDialogCompanion=chatDialogCompanion
                            }}}
                            <div class="chats__meeting-wrapper {{disableMeetingScreen}}">
                                <p class="chats__meeting">Выберите чат чтобы отправить сообщение</p>
                            </div>
                            <div class="chat__dialog-content custom-scrollbar {{chatDialogContent}}">
                                {{#each messageContent}}
                                    <div class="chat__message-date">
                                        <span>{{date}}</span>
                                    </div>
                                    {{#each messages}}
                                        {{#if myContent}}
                                            <div class="chat__message-out chat__message-wrapper">
                                                <div class="chat__message-content">
                                                    <span>
                                                        {{myContent}}
                                                    </span>
                                                    <div class="chat__message-time">
                                                        <span>{{time}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        {{/if}}
                                        {{#if alienContent}}
                                            <div class="chat__message-in chat__message-wrapper">
                                                <div class="chat__message-content">
                                                    <span>
                                                        {{alienContent}}
                                                    </span>
                                                    <div class="chat__message-time">
                                                        <span>{{time}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        {{/if}}
                                    {{/each}}
                                {{/each}}
                             </div>
                            {{{ChatDialogBot
                                onClick=onClickBot
                                onSubmit=onSendMessage
                            }}}
                        </div>
                    </div>
                </div>
                <div class="popup popup_add">
                    <input type="checkbox" id="popup-add" class="popup__state" {{modalChecked}}>
                    <div class="popup__wrapper">
                        <label for="popup-add" class="popup__bg"></label>
                        <div class="popup__container">
                            <h3 class="popup__title">Добавить пользователя</h3>
                            <div class="popup__input">
                                {{{Input
                                    type="text"
                                    placeholder="Логин"
                                    id="add-user"
                                    class="form__item-input"
                                    name="search"
                                    value=searchValue
                                 }}}
                            </div>
                            {{{Button
                                onSubmit=addUser
                                text="Добавить"
                                class="button button-submit"
                            }}}
                        </div>
                    </div>
                </div>
                <div class="popup popup_remove">
                    <input type="checkbox" id="popup-remove" class="popup__state">
                    <div class="popup__wrapper">
                        <label for="popup-remove" class="popup__bg"></label>
                        <div class="popup__container">
                            <h3 class="popup__title">Удалить пользователя</h3>
                            <div class="popup__input">
                                <input type="text" placeholder="Логин" id="remove-user" class="form__item-input">
                            </div>
                            {{{Button
                                onSubmit=removeUser
                                text="Удалить"
                                class="button button-submit"
                            }}}
                        </div>
                    </div>
                </div>
                <div class="popup popup_create">
                    <input type="checkbox" id="popup-create" class="popup__state">
                    <div class="popup__wrapper">
                        <label for="popup-create" class="popup__bg"></label>
                        <div class="popup__container">
                            <h3 class="popup__title">Создать чат</h3>
                            <div class="popup__input">
                                <input type="text" placeholder="Имя чата" id="chat-name" class="form__item-input">
                            </div>
                            {{{Button
                                text="Создать"
                                onSubmit=createChat
                            }}}
                        </div>
                    </div>
                </div>
            </section>
        `
    }
}

function fn(state = window.store.getState()) {
    return {
        disableMeetingScreen: state.disableMeetingScreen,
        messageContent: state.messageContent,
        chatDialogContent: state.chatDialogContent,

    }
}

// @ts-expect-error No base constructor has the specified
export default withRouter(withStore(Chats), fn);
