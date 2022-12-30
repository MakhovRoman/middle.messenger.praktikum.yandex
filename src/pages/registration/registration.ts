import Block from 'core/Block';
import { messageOutput } from 'helpers/messageOutput';

export class Registration extends Block {
    constructor() {
        super();
        this.setProps({
            onSubmit: this.onSubmit.bind(this),
            onInput: this.onInput.bind(this),
            onBlur: this.onBlur.bind(this),
            onFocus: this.onFocus.bind(this),
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
            result: {}
        })
    }

    onInput(e: InputEvent) {
        const context = this;
        messageOutput({e, context, page: 'registration'});
    }

    onBlur(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: 'registration'});
    }

    onFocus(e: FocusEvent) {
        const context = this;
        messageOutput({e, context, page: 'registration', type: 'focus'})
    }

    onSubmit(event: Event) {
        const context = this;
        messageOutput({e: event, context, page: 'registration', type: 'submit'});
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
                        {{{BackToAutLink}}}
                    </form>
                </div>
            </section>
        `
    }
}
