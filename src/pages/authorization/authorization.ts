import Block from 'core/Block';
import { CoreRouter } from 'core/Router/CoreRouter';
import { Store } from 'core/Store';
import { messageOutput } from 'helpers/messageOutput';
import { AppState } from '../../../typings/app';
import { withRouter } from 'helpers/withRouter';
import { withStore } from 'helpers/withStore';
import { login } from 'services/auth-services';
import { checkActiveUser } from 'helpers/checkActiveUser';

type AuthorizationPageProps = {
    router: CoreRouter;
    store: Store<AppState>;
    // onSubmit: (event: Event) => void;
    // onInput: (event: InputEvent) => void;
    // onFocus: (event: FocusEvent) => void;
    // onBlur: (event: FocusEvent) => void;
    // onNavigateNext?: (event: Event) => void;
    // errorMessage: Record<string | number | symbol, String>;
    // loginValue: string;
    // passwordValue: string;
    // class: string;
    // result: any;
    formError?: () => string | null;
};

export class Authorization extends Block<AuthorizationPageProps> {
    static cName = 'Authorization';

    constructor(props: AuthorizationPageProps) {
        super(props);

        this.setProps({
            formError: () => this.props.store.getState().loginFormError
        });
    }

    componentDidUpdate() {
        return window.store.getState().screen === 'login';
    }

    // onNavigateNext(e: Event) {
    //     e.preventDefault();
    //     this.props.router.go('/registration');
    // }

    // onInput(e: InputEvent) {
    //     const context = this;
    //     messageOutput({e, context, page: 'autorization'});
    // }

    // onFocus(e: FocusEvent) {
    //     const context = this;
    //     messageOutput({e, context, page: 'autorization', type: 'focus'})
    // }

    // onBlur(e: FocusEvent) {
    //     const context = this;
    //     messageOutput({e, context, page: 'autorization'});
    // }

    // onSubmit(event: Event) {
    //     const context = this;
    //     messageOutput({e: event, context, page: 'autorization', type: 'submit'});
    // }

    protected getStateFromProps() {
        this.state = {
            onSubmit: (event: Event) => {
               let response = messageOutput({event, context: this, page: 'autorization', type: 'submit'});

               if (response?.errorMessage.errorMessageLogin == '' && response.errorMessage.errorMessagePassword == '') {
                    this.props.store.dispatch(login, response.result);
                }
            },
            onBlur: (event: FocusEvent) => {
                  messageOutput({event, context: this, page: 'autorization'});
            },
            onFocus: (event: FocusEvent) => {
                messageOutput({event, context: this, page: 'autorization', type: 'focus'})
            },
            onInput: (event: InputEvent) => {
                messageOutput({event, context: this, page: 'autorization'});
            },
            onNavigateNext: (event: Event) => {
                event.preventDefault();
                this.props.router.go('/registration');
            },
            errorMessage: {
                errorMessageLogin: '',
                errorMessagePassword: ''
            },
            loginValue: '',
            passwordValue: '',
            class: 'form__item-input',
            result: {},

            // router: window.router,
            // store: window.store
        }
    }

    protected render() {
        console.log('%c render login ', 'background: yellow; color: black')
        return `
            <section class="wrapper-autorization">
                <div class="content-autorization">
                    <h1 class="content-autorization__title">Вход</h1>
                    <form action="" class="content-autorization__form form">
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
                            type="password"
                            name="password"
                            title="Пароль"
                            placeholder="Пароль"
                            ref="passwordInput"
                            value=passwordValue
                            error=errorMessage.errorMessagePassword
                            class=class
                        }}}
                        {{{Button text="Авторизоваться" onSubmit=onSubmit}}}
                        <div class="response-error">{{formError}}</div>
                        {{{GoToRegistration onNavigateNext=onNavigateNext}}}
                    </form>
                </div>
            </section>
        `
    }
}

export default withRouter(withStore(Authorization));
