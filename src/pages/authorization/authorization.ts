import Block from 'core/Block';
import { messageOutput } from 'helpers/messageOutput';
export class Authorization extends Block {
    constructor() {
        super();

        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            onInput: this.onInput.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
            errorMessage: {
                errorMessageLogin: '',
                errorMessagePassword: ''
            },
            loginValue: '',
            passwordValue: '',
            class: 'form__item-input',
            result: {}
        });
    }

    onInput(e: InputEvent) {
        const context = this;
        messageOutput({e, context, page: 'autorization'});
    }

    onFocus(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: 'autorization', type: 'focus'})
    }

    onBlur(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: 'autorization'});
    }

    onSubmit(event: Event) {
        const context = this;
        messageOutput({e: event, context, page: 'autorization', type: 'submit'});
    }

    protected render() {
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
                        <a href="../registration/registration.html" class="link back-to__link">Нет аккаунта?</a>
                    </form>
                </div>
            </section>
        `
    }
}
