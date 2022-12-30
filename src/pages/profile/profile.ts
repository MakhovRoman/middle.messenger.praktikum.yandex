import Block from 'core/Block';
import { messageOutput } from 'helpers/messageOutput';

let photo = new Image();
photo.src = require('asserts/photo.png')

export class Profile extends Block {
    constructor() {
        super();

        this.setProps({
            onClick: this.onClick.bind(this),
            onSubmit: this.onSubmit.bind(this),
            onInput: this.onInput.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            onPick: this.onPick.bind(this),
            onLoad: this.onLoad.bind(this),
            goToChangePassword: this.goToChangePassword.bind(this),
            onSubmitNewPassword: this.onSubmitNewPassword.bind(this),
            status: 'disabled',
            status_submit: 'none',
            status_link: '',
            href: "#",
            label_visible: '',
            status_popup: '',
            file_load_name: '',
            file_load_direction: '',
            error_file_load: '',
            status_form_change_password: 'none',
            status_form_change_profile: '',
            errorMessage: {
                errorMessageLogin: '',
                errorMessageEmail: '',
                errorMessageName: '',
                errorMessageSecondName: '',
                errorMessagePhone: '',
            },
            placeholders: {
                email: 'pochta@yandex.ru',
                login: 'ivanivanov',
                first_name: 'Иван',
                second_name: 'Иванов',
                display_name:'Иван',
                phone: '+7 (909) 967 30 30',
                password: 'Новый пароль',
                passwordCheck: 'Повторите новый пароль',
            },
            loginValue: '',
            passwordValue: '',
            emailValue: '',
            nameValue: '',
            secondNameValue: '',
            phoneValue: '',
            passwordCheckValue: '',
            class: 'profile__input',
            result: {}
        })
    }

    onClick(e: Event) {
        e.preventDefault();
        this.setProps({
            status_link: 'none',
            status_submit: 'flex',
            status: '',
            status_popup: '',
            placeholders: {
                email: 'Введите почту',
                login: 'Введите логин',
                first_name: 'Введите имя',
                second_name: 'Введите фамилию',
                display_name:'Введите имя в чате',
                phone: 'Введите номер телефона',
            }
        })
    }

    goToChangePassword(e: Event) {
        e.preventDefault();

        this.setProps({
            status_form_change_password: '',
            status_form_change_profile: 'none'
        })
    }

    onPick(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        const result = value.replace(/^.*[\\\/]/, '');

        if (value) {
            this.setProps({
                label_visible: 'none',
                status_popup: 'checked',
                file_load_name: result,
                file_load_direction: value,
                error_file_load: ''
            })
        }
    }

    onSubmit(event: Event) {
        const context = this;
        messageOutput({e: event, context, page: "profile", type: 'submit'});
    }

    onSubmitNewPassword(event: Event) {
        const context = this;
        messageOutput({e: event, context, page: "password", type: 'submit'});
    }

    onLoad(e: Event) {
        e.preventDefault();

        const target = document.querySelector('#file_load_name') as HTMLElement;
        const result = target.dataset.fileDirection;

        if (result) {
            console.log({file_load_direction: result});
        } else {
            this.setProps({
                status_popup: 'checked',
                error_file_load: 'Нужно выбрать файл'
            })
        }
    }

    onInput(e: InputEvent) {
        const context = this;
        messageOutput({e, context, page: "profile"});
    }

    onFocus(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: "profile", type: 'focus'})
    }

    onBlur(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: "profile"});
    }

    protected render() {
        return `
            <section class="profile">
                <div class="profile__avatar">
                    <a href="../chats/chats.html" class="link">
                        <div class="back-from-profile">
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="14" cy="14" r="14" transform="rotate(-180 14 14)" fill="#3369F3"/>
                                <rect x="20" y="14.8" width="11" height="1.6" transform="rotate(-180 20 14.8)" fill="white"/>
                                <path d="M13 19L9 14L13 9" stroke="white" stroke-width="1.6"/>
                            </svg>
                        </div>
                    </a>
                    <label for="popup" class="label-for-popup">
                        <img src="${photo.src}" alt="pick-photo">
                    </label>
                    <h1 class="user-name" style="visibility: {{user-name_visibility}}">Иван</h1>
                    <div class="popup">
                        <input type="checkbox" id="popup" class="popup__state" {{status_popup}}>
                        <div class="popup__wrapper">
                            <label for="popup" class="popup__bg"></label>
                            <form action="" id="form-for-avatar" class="form-for-avatar form">
                                <h2 class="form-for-avatar__title">Загрузите файл</h2>
                                <label for="load-avatar" class="form-for-avatar__label" style="display: {{label_visible}}">Выбрать файл на компьютере</label>
                                <span id="file_load_name" data-file-direction="{{file_load_direction}}">{{file_load_name}}</span>
                                {{{Input
                                    onPick=onPick
                                    type="file"
                                    id="load-avatar"
                                    accept="image/*"
                                    name="photo"
                                    ref="loadFile"
                                    value=value
                                }}}
                                <div class="form__item">
                                    {{{Button text="Поменять" onSubmit = onLoad}}}
                                    {{{InputError error=error_file_load ref="errorField"}}}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <form action="" name="profile" class="profile__content form" style="display: {{status_form_change_profile}}">
                    <div class="profile__item">
                        <label for="profile__email" class="profile__label">Почта</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="email"
                            name="email"
                            title="E-mail"
                            placeholder=placeholders.email
                            ref="emailInput"
                            value=emailValue
                            error=errorMessage.errorMessageEmail
                            class=class
                            status=status
                        }}}
                    </div>
                    <div class="profile__item">
                        <label for="profile__login" class="profile__label">Логин</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="login"
                            title="Логин"
                            placeholder=placeholders.login
                            ref="loginInput"
                            value=loginValue
                            error=errorMessage.errorMessageLogin
                            class=class
                            status=status
                        }}}
                    </div>
                    <div class="profile__item">
                        <label for="profile__first-name" class="profile__label">Имя</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="first_name"
                            title="Имя"
                            placeholder=placeholders.first_name
                            ref="nameInput"
                            value=nameValue
                            error=errorMessage.errorMessageName
                            class=class
                            status=status
                        }}}
                    </div>
                    <div class="profile__item">
                        <label for="profile__second-name" class="profile__label">Фамилия</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="second_name"
                            title="Фамилия"
                            placeholder=placeholders.second_name
                            ref="secondNameInput"
                            value=secondNameValue
                            error=errorMessage.errorMessageSecondName
                            class=class
                            status=status
                        }}}
                    </div>
                    <div class="profile__item">
                        <label for="profile__display-name" class="profile__label">Имя в чате</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="display_name"
                            title="Имя в чате"
                            placeholder=placeholders.display_name
                            ref="displayNameInput"
                            value=displayNameValue
                            error=errorMessage.errorMessageDisplayName
                            class=class
                            status=status
                            id="profile__display-name"
                        }}}
                    </div>
                    <div class="profile__item">
                        <label for="profile__phone" class="profile__label">Телефон</label>
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="tel"
                            name="phone"
                            title="Телефон"
                            placeholder=placeholders.phone
                            ref="phoneInput"
                            value=phoneValue
                            error=errorMessage.errorMessagePhone
                            class=class
                            status=status
                        }}}
                    </div>
                    <div class="profile__actions">
                        <div class="profile__item" style="display: {{status_link}}" id="change-profile-data">
                            {{{Link
                                title="Изменить данные"
                                class="back-to__link"
                                onClick=onClick
                            }}}
                        </div>
                        <div class="profile__item" style="display: {{status_link}}">
                            {{{Link
                                title="Изменить пароль"
                                class="back-to__link"
                                onClick=goToChangePassword
                            }}}
                        </div>
                        <div class="profile__item" style="display: {{status_link}}" >
                            <a href="./index.hbs" class="back-to__link profile__exit">Выйти</a>
                        </div>
                        <div class="profile__submit" style="display: {{status_submit}}">
                            {{{Button
                                text="Поменять"
                                onSubmit=onSubmit
                            }}}
                        </div>
                    </div>
                </form>
                <form action="" name="profile-change-password" class="form profile__content" style="display: {{status_form_change_password}}">
                <div class="profile__item">
                    <label for="profile__oldPassword" class="profile__label">Старый пароль</label>
                    <input class="profile__input" type="text" name="oldPassword" title="Старый пароль" id="profile__oldPassword" placeholder="*******">
                </div>
                <div class="profile__item">
                    <label for="profile__login" class="profile__label">Новый пароль</label>
                    {{{InputControlled
                        onInput=onInput
                        onFocus=onFocus
                        onBlur=onBlur
                        type="password"
                        name="password"
                        title="Новый пароль"
                        placeholder=placeholders.password
                        ref="passwordInput"
                        value=passwordValue
                        error=errorMessage.errorMessagePassword
                        class=class
                    }}}
                </div>
                <div class="profile__item">
                    <label for="profile__requirePassword" class="profile__label">Повторите новый пароль</label>
                    {{{InputControlled
                        onInput=onInput
                        onFocus=onFocus
                        onBlur=onBlur
                        type="password"
                        name="check_password"
                        title="Повторите новый пароль"
                        placeholder=placeholders.passwordCheck
                        ref="passwordCheckInput"
                        value=passwordCheckValue
                        error=errorMessage.errorMessagePasswordCheck
                        class=class
                    }}}
                </div>
                <div class="profile__actions">
                    {{{Button
                        text="Сохранить"
                        onSubmit=onSubmitNewPassword
                    }}}
                </div>
            </form>
            </section>
        `
    }
}
