import Block from 'core/Block';
import { CoreRouter } from 'core/Router/CoreRouter';
import { messageOutput } from 'helpers/messageOutput';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { AppState } from '../../../typings/app';
import { Store } from 'core/Store';
import { signUp } from 'services/auth-services';

type RegistrationsPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    formError?: () => string | null;
}

export class Registration extends Block<RegistrationsPageProps> {
    static cName = 'Registration';
    constructor(props: RegistrationsPageProps) {
        super(props);
    }

    protected getStateFromProps() {
        this.state = {
            onNavigateNext: (event: Event) => {
                event.preventDefault();
                this.props.router.go('/login');
            },
            onInput: (event: InputEvent) => {
                messageOutput({event, context: this, page: 'registration'});
            },
            onBlur: (event: FocusEvent) => {
                messageOutput({event, context: this, page: 'registration'});
            },
            onFocus: (event: FocusEvent) => {
                messageOutput({event, context: this, page: 'registration', type: 'focus'})
            },
            onSubmit: (event: Event) => {
                let response = messageOutput({event, context: this, page: 'registration', type: 'submit'});

                if (response?.result.password) {
                    this.props.store.dispatch(signUp, response.result);
                }
            },
            errorMessage: {
                errorMessageLogin: '',
                errorMessagePassword: '',
                errorMessageEmail: '',
                errorMessageName: '',
                errorMessageSecondName: '',
                errorMessagePhone: '',
                errorMessagePasswordCheck: ''
            },
            loginValue: '',
            passwordValue: '',
            emailValue: '',
            nameValue: '',
            secondNameValue: '',
            phoneValue: '',
            passwordCheckValue: '',
            class: 'form__item-input',
            result: {},
            router: window.router,
            store: window.store
        }
    }


    protected render() {
        return `
            <section class="wrapper-autorization wrapper-registration">
                <div class="content-autorization content-registration">
                    <h1 class="content-autorization__title">Регистрация</h1>
                    <form action="" class="content-autorization__form form">
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="email"
                            name="email"
                            title="E-mail"
                            placeholder="Почта"
                            ref="emailInput"
                            value=emailValue
                            error=errorMessage.errorMessageEmail
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="login"
                            title="Логин"
                            placeholder="Логин"
                            ref="loginInput"
                            value=loginValue
                            error=errorMessage.errorMessageLogin
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="first_name"
                            title="Имя"
                            placeholder="Имя"
                            ref="nameInput"
                            value=nameValue
                            error=errorMessage.errorMessageName
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="text"
                            name="second_name"
                            title="Фамилия"
                            placeholder="Фамилия"
                            ref="secondNameInput"
                            value=secondNameValue
                            error=errorMessage.errorMessageSecondName
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="tel"
                            name="phone"
                            title="Телефон"
                            placeholder="Телефон"
                            ref="phoneInput"
                            value=phoneValue
                            error=errorMessage.errorMessagePhone
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="password"
                            name="password"
                            title="Пароль"
                            placeholder="Пароль"
                            ref="passwordInput"
                            value=passwordValue
                            error=errorMessage.errorMessagePassword
                            class=class
                        }}}
                        {{{InputControlled
                            onInput=onInput
                            onFocus=onFocus
                            onBlur=onBlur
                            type="password"
                            name="check_password"
                            title="Пароль (еще раз)"
                            placeholder="Пароль (еще раз)"
                            ref="passwordCheckInput"
                            value=passwordCheckValue
                            error=errorMessage.errorMessagePasswordCheck
                            class=class
                        }}}
                        {{{Button text="Зарегистрироваться" onSubmit=onSubmit}}}
                        {{{GoToAuthorization onNavigateNext = onNavigateNext}}}
                    </form>
                </div>
            </section>
        `
    }
}


export default withRouter(withStore(Registration));
