import Block from 'core/Block';

type DataType = {
    title: HTMLElement | null,
    avatar: HTMLElement | null
}

function showCurrentChat(e: Event) {
    const chatArray: HTMLElement[] = Array.from(document.querySelectorAll('.chat__item'));
    const chatMeeting = document.querySelector('.chats__meeting-wrapper');
    const chatDialog = document.querySelector('.chat__dialog-content');
    const dialogCompanion = document.querySelector('.chat__dialog-companion');

    // в дальнейшем с помощью этого индекса буду выбирать контент чатов из массива
    let currentNumber: number;
    let currentEl = e.currentTarget;
    const currentElData: DataType = {
        title: (currentEl as HTMLElement).querySelector('.chat__info-title > h3'),
        avatar: (currentEl as HTMLElement).querySelector('.chat__avatar-content'),
    };
    const dialogCompanionData: DataType = {
        title: dialogCompanion!.querySelector('.chat__dialog-name'),
        avatar: dialogCompanion!.querySelector('.chat__avatar-content'),
    };

    for(let i = 0; i < chatArray.length; i++) {
        if (chatArray[i].classList.contains('chat__item_active')) {
            chatArray[i].classList.remove('chat__item_active');
        }
        if (currentEl == chatArray[i]) currentNumber = i;
    };

    // отображение выбранного чата и диалога
    (currentEl as HTMLElement).classList.add('chat__item_active');
    (chatMeeting as HTMLElement).style.display = 'none';
    (chatDialog as HTMLElement).classList.add('chat__dialog-content_active');

    //вывод аватара и имени собеседника в top
    if (dialogCompanionData.title && currentElData.title) {
        dialogCompanionData.title.textContent =currentElData.title.textContent;
    }
    if (dialogCompanionData.avatar && currentElData.avatar) {
        dialogCompanionData.avatar.innerHTML = currentElData.avatar.innerHTML;
    }
}

export class Chats extends Block {
    constructor() {
        super();
        this.setProps({
            onClickTop: this.onClickTop.bind(this),
            onClickBot: this.onClickBot.bind(this),
            onCheck: this.onCheck.bind(this),
            onSubmit: this.onSubmit.bind(this)
        })
    }

    onClickTop(e: Event) {
        let target = document.querySelector('.dialog-tools__button');
        let target2 = document.querySelector('.dialog-tools__button img');

        if (target == e.target || target2 == e.target) {
            const modal = document.getElementById('modal-add-user');
            modal?.classList.toggle('chat__modal-tools_active');
        }
    }

    onClickBot(e: Event) {
        let target = document.querySelector('.dialog-attach__icon img');

        if (target == e.target) {
            const modal = document.getElementById('modal-attach');
            modal?.classList.toggle('chat__modal-attach_active');
        }
    }

    onSubmit(e: Event) {
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

    }

    onCheck(e: Event) {
        showCurrentChat(e);
    }

    protected render() {
        return `
            <section class="chats">
                <div class="chats__left-column">
                    <div class="chats__top">
                        <div class="chats__go-to-profile">
                            <a href="../profile/profile.html" class="chats__link">Профиль ❯</a>
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
                    {{{ChatList
                        onCheck=onCheck
                    }}}
                </div>
                <div class="chats__right-column">
                    <div class="chat__dialog">
                        <div class="chat__dialog-container">
                            {{{ChatDialogTop
                                onClick=onClickTop
                                add_user_modal=add_user_modal
                            }}}
                            <div class="chats__meeting-wrapper">
                                <p class="chats__meeting">Выберите чат чтобы отправить сообщение</p>
                            </div>
                            <div class="chat__dialog-content custom-scrollbar">
                                {{{ChatMessageGroup}}}
                                {{{ChatMessageGroup}}}
                                {{{ChatMessageGroup}}}
                             </div>
                            {{{ChatDialogBot
                                onClick=onClickBot
                                onSubmit=onSubmit
                            }}}
                        </div>
                    </div>
                </div>
                <div class="popup popup_add">
                    <input type="checkbox" id="popup-add" class="popup__state">
                    <div class="popup__wrapper">
                        <label for="popup-add" class="popup__bg"></label>
                        <div class="popup__container">
                            <h3 class="popup__title">Добавить пользователя</h3>
                            <div class="popup__input">
                                <input type="text" placeholder="Логин" id="add-user" class="form__item-input">
                            </div>
                            <button type="submit" class="button button-submit">Добавить</button>
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
                            <button type="submit" class="button button-submit">Удалить</button>
                        </div>
                    </div>
                </div>
            </section>
        `
    }
}
