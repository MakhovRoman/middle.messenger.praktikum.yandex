import Block from 'core/Block';
import { CoreRouter } from 'core/Router/CoreRouter';
import { messageOutput } from 'helpers/messageOutput';
import { AppState, User } from '../../../typings/app';
import { Store } from 'core/Store';
import { withStore } from 'helpers/withStore';
import { withRouter } from 'helpers/withRouter';
import { withUser } from 'helpers/withUser';
import { logout } from 'services/auth-services';
import { changeUserAvatar, changeUserPassword, changeUserProfile } from 'services/user-services';
import URL from 'api/urls';

let photo = new Image();
photo.src = require('asserts/photo.png');

type ProfilePageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    status: string,
    status_submit: string,
    status_link: string,
    href: string,
    label_visible: string,
    status_popup: string,
    file_load_name: string,
    file_load_direction: string,
    error_file_load: string,
    status_form_change_password: string,
    status_form_change_profile: string,
    errorMessage: {
        errorMessageLogin: string,
        errorMessageEmail: string,
        errorMessageName: string,
        errorMessageSecondName: string,
        errorMessagePhone: string,
    },
    placeholders: {
        email: string,
        login: string,
        first_name: string,
        second_name: string,
        display_name:string,
        phone: string,
        password?: string,
        passwordCheck?: string,
    },
    loginValue: string,
    passwordValue: string,
    emailValue: string,
    nameValue: string,
    secondNameValue: string,
    phoneValue: string,
    passwordCheckValue: string,
    displayNameValue: string,
    avatarValue: string,
    class: string,
    result: {},
    formError?: () => string | null;
}

export class Profile extends Block {
    static cName = 'Profile';
    user: User;

    constructor(props: ProfilePageProps) {
        super(props);
        this.user = window.store.getState().user;

        this.setProps({
            onClick: this.onClick.bind(this),
            onSubmit: this.onSubmit.bind(this),
            onInput: this.onInput.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            onPick: this.onPick.bind(this),
            onLoad: this.onLoad.bind(this),
            onLogout: this.onLogout.bind(this),
            checkAvatar: this.checkAvatar.bind(this),
            onNavigateBack: this.onNavigateBack.bind(this),
            goToChangePassword: this.goToChangePassword.bind(this),
            onSubmitNewPassword: this.onSubmitNewPassword.bind(this),
            status: 'disabled',
            status_submit: 'none',
            status_link: '',
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
                email: `${this.user.email}`,
                login: `${this.user.login}`,
                first_name: `${this.user.firstName}`,
                second_name: `${this.user.secondName}`,
                display_name:`${this.user.displayName || ''}`,
                phone: `${this.user.phone}`,
                password: 'Новый пароль',
                passwordCheck: 'Повторите новый пароль',
            },
            loginValue: `${this.user.login}`,
            passwordValue: '',
            emailValue: `${this.user.email}`,
            nameValue: `${this.user.firstName}`,
            secondNameValue: `${this.user.secondName}`,
            phoneValue: `${this.user.phone}`,
            displayNameValue: `${this.user.displayName || ''}`,
            avatarValue:`${this.checkAvatar()}`,
            passwordCheckValue: '',
            class: 'profile__input',
            result: {}
        })
    }

    onNavigateBack() {
        this.props.router.go('/chat');
    }

    componentDidUpdate() {
        return window.store.getState().screen === 'profile';
    }

    checkAvatar() {
        return this.user.avatar ? `${URL.RESOURCES}${this.user.avatar}` : `${photo.src}`;
    }

    checkUser() {
        return window.store.getState().user;
    }

    onClick(e: Event) {
        e.preventDefault();
        this.setProps({
            status_link: 'none',
            status_submit: 'flex',
            status: '',
            status_popup: '',
            placeholders: {
                email: 'Введите e-mail',
                login: 'Введите логин',
                first_name: 'Введите имя',
                second_name: 'Введите фамилию',
                display_name:'Введите имя в чате',
                phone: 'Введите номер телефона',
            },
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

        const span = document.querySelector('#file_load_name');
        const label = document.querySelector('.form-for-avatar__label');

        span!.textContent = result;
        (label as HTMLElement)!.style.display = 'none';

        // if (value) {
        //     this.setProps({
        //         label_visible: 'none',
        //         status_popup: 'checked',
        //         file_load_name: result,
        //         file_load_direction: value,
        //         error_file_load: ''
        //     })
        // }
    }

    onSubmit(event: Event) {
        const context = this;
        let response = messageOutput({event, context, page: 'profile', type: 'submit'});
        if (response?.errorMessage.errorMessageLogin == '' &&
            response.errorMessage.errorMessageEmail == '' &&
            response.errorMessage.errorMessageName == '' &&
            response.errorMessage.errorMessageSecondName == '' &&
            response.errorMessage.errorMessagePhone == ''
        ) {
            this.props.store.dispatch(changeUserProfile, response.result);
            this.setProps({
                status: 'disabled',
                status_submit: 'none',
                status_link: '',
            })

            setTimeout(() => {this.setProps({
                loginValue: `${this.checkUser().login}`,
                emailValue: `${this.checkUser().email}`,
                nameValue: `${this.checkUser().firstName}`,
                secondNameValue: `${this.checkUser().secondName}`,
                phoneValue: `${this.checkUser().phone}`,
                displayNameValue: `${this.checkUser().displayName || ''}`,
            })}, 100)
        }
    }

    onSubmitNewPassword(event: Event) {
        event.preventDefault();

        const context = this;
        const response = messageOutput({event, context, page: 'password', type: 'submit'});


        if(
            response?.errorMessage.errorMessagePassword == '' &&
            response.errorMessage.errorMessagePasswordCheck == ''
        ) {
            const result = {
                oldPassword: response.result.oldPassword,
                newPassword: response?.result.newPassword
            };

            this.props.store.dispatch(changeUserPassword, result);
            this.setProps({
                status_form_change_password: 'none',
                status_form_change_profile: '',
            })
        }
    }

    onLoad(e: Event) {
        e.preventDefault();

        const target = document.querySelector('#file_load_name') as HTMLElement;
        const result = target.textContent;
        const form:HTMLFormElement = document.querySelector('#form-for-avatar')!;

        if (result) {

            if (!form) {
                return;
            }

            const formData = new FormData(form);

            this.props.store.dispatch(changeUserAvatar, formData);

            this.setProps({
                status_popup: '',
            });

            setTimeout(() => this.setProps({avatarValue: `${URL.RESOURCES}${this.checkUser().avatar}`}), 500);
        } else {
            this.setProps({
                status_popup: 'checked',
                error_file_load: 'Нужно выбрать файл'
            })
        }
    }

    onInput(event: InputEvent) {
        const context = this;
        messageOutput({event, context, page: 'profile'});
    }

    onFocus(event: FocusEvent) {
        const context = this;
        messageOutput({event, context, page: 'profile', type: 'focus'})
    }

    onBlur(event: FocusEvent) {
        const context = this;
        messageOutput({event, context, page: 'profile'});
    }

    onLogout(event: Event) {
        console.log('logout')
        event.preventDefault();
        this.props.store.dispatch(logout);
    }

    // protected getStateFromProps() {
    //     const USER = window.store.getState().user;

    //     this.state = {
    //         status: 'disabled',
    //         status_submit: 'none',
    //         status_link: '',
    //         href: '#',
    //         label_visible: '',
    //         status_popup: '',
    //         file_load_name: '',
    //         file_load_direction: '',
    //         error_file_load: '',
    //         status_form_change_password: 'none',
    //         status_form_change_profile: '',
    //         errorMessage: {
    //             errorMessageLogin: '',
    //             errorMessageEmail: '',
    //             errorMessageName: '',
    //             errorMessageSecondName: '',
    //             errorMessagePhone: '',
    //         },
    //         placeholders: {
    //             email: `${USER.email}`,
    //             login: `${USER.login}`,
    //             first_name: `${USER.firstName}`,
    //             second_name: `${USER.secondName}`,
    //             display_name: `${USER.displayName || ''}`,
    //             phone: `${USER.phone}`,
    //             password: 'Новый пароль',
    //             passwordCheck: 'Повторите новый пароль',
    //         },
    //         loginValue: '',
    //         passwordValue: '',
    //         emailValue: '',
    //         nameValue: '',
    //         secondNameValue: '',
    //         phoneValue: '',
    //         passwordCheckValue: '',
    //         class: 'profile__input',
    //         result: {},
    //         onClick: (event: Event) => {
    //             event.preventDefault();
    //             this.setProps({
    //                 status_link: 'none',
    //                 status_submit: 'flex',
    //                 status: '',
    //                 status_popup: '',
    //                 placeholders: {
    //                     email: '',
    //                     login: '',
    //                     first_name: '',
    //                     second_name: '',
    //                     display_name: `${USER.displayName || ''}`,
    //                     phone: '',
    //                 },
    //                 loginValue: `${USER.login}`,
    //                 emailValue: `${USER.email}`,
    //                 nameValue: `${USER.firstName}`,
    //                 secondNameValue: `${USER.secondName}`,
    //                 phoneValue: `${USER.phone}`,
    //             })
    //         },
    //         goToChangePassword: (event: Event) => {
    //             event.preventDefault();

    //             this.setProps({
    //                 status_form_change_password: '',
    //                 status_form_change_profile: 'none'
    //             })
    //         },
    //         onPick: (event: Event) => {
    //             const value = (event.target as HTMLInputElement).value;
    //             const result = value.replace(/^.*[\\\/]/, '');

    //             if (value) {
    //                 this.setProps({
    //                     label_visible: 'none',
    //                     status_popup: 'checked',
    //                     file_load_name: result,
    //                     file_load_direction: value,
    //                     error_file_load: ''
    //                 })
    //             }
    //         },
    //         onSubmit(event: Event) {

    //             let response = messageOutput({event, context: this, page: 'profile', type: 'submit'});
    //             if (response?.errorMessage.errorMessageLogin == '' &&
    //                 response.errorMessage.errorMessageEmail == '' &&
    //                 response.errorMessage.errorMessageName == '' &&
    //                 response.errorMessage.errorMessageSecondName == '' &&
    //                 response.errorMessage.errorMessagePhone == ''
    //             ) {
    //                 this.props.store.dispatch(changeUserProfile, response.result);
    //             }
    //         },
    //         onSubmitNewPassword: (event: Event) => {
    //             messageOutput({event, context: this, page: 'password', type: 'submit'});
    //         },
    //         onLoad: (event: Event) => {
    //             event.preventDefault();

    //             const target = document.querySelector('#file_load_name') as HTMLElement;
    //             const result = target.dataset.fileDirection;

    //             if (result) {
    //                 console.log({file_load_direction: result});
    //             } else {
    //                 this.setProps({
    //                     status_popup: 'checked',
    //                     error_file_load: 'Нужно выбрать файл'
    //                 })
    //             }
    //         },
    //         onInput: (event: InputEvent) => {
    //             console.log(this.props)
    //              messageOutput({event, context: this, page: 'profile'});
    //         },
    //         onFocus: (event: FocusEvent) => {
    //             messageOutput({event, context: this, page: 'profile', type: 'focus'})
    //         },
    //         onBlur: (event: FocusEvent) => {
    //             messageOutput({event, context: this, page: 'profile'});
    //         },
    //         onLogout: (event: Event) => {
    //             event.preventDefault();
    //             this.props.store.dispatch(logout);
    //         }
    //     }
    // }

    protected render() {
        console.log('%c render profile ', 'background: red; color: black');
        return `
            <section class="profile">
                <div class="profile__avatar">
                    {{{GoFromProfileToChat
                        onNavigateBack=onNavigateBack
                    }}}
                    <label for="popup" class="label-for-popup">
                        <img src="{{avatarValue}}" alt="pick-photo">
                    </label>
                    <h1 class="user-name" style="visibility: {{user-name_visibility}}">{{displayNameValue}}</h1>
                    <div class="popup">
                        <input type="checkbox" id="popup" class="popup__state" {{status_popup}}>
                        <div class="popup__wrapper">
                            <label for="popup" class="popup__bg"></label>
                            <form action="" id="form-for-avatar" class="form-for-avatar form">
                                <h2 class="form-for-avatar__title">Загрузите файл</h2>
                                <label for="avatar" class="form-for-avatar__label" style="display: {{label_visible}}">
                                    Выбрать файл на компьютере
                                </label>
                                <span id="file_load_name" data-file-direction="{{file_load_direction}}">
                                    {{file_load_name}}
                                </span>
                                {{{Input
                                    onPick=onPick
                                    type="file"
                                    id="avatar"
                                    accept="image/*"
                                    name="avatar"
                                    ref="loadFile"
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
                            {{{LogoutLink onLogout=onLogout}}}
                        </div>
                        <div class="profile__submit" style="display: {{status_submit}}">
                            {{{Button
                                text="Поменять"
                                onSubmit=onSubmit
                            }}}
                        </div>
                    </div>
                </form>
                <form
                    action=""
                    name="profile-change-password"
                    class="form profile__content"
                    style="display: {{status_form_change_password}}"
                >
                <div class="profile__item">
                    <label for="profile__oldPassword" class="profile__label">Старый пароль</label>
                    {{{InputControlled
                        onInput=onInput
                        onFocus=onFocus
                        onBlur=onBlur
                        type="text"
                        name="oldPassword"
                        title="Старый пароль"
                        placeholder='********'
                        ref="oldPassword"
                        class=class
                    }}}
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
// @ts-expect-error No base constructor has the specified
export default withRouter(withStore(withUser(Profile)));
