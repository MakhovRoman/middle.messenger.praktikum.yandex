import { ValidateRuleType } from './validateForm';
import { validateForm } from './validateForm';

export enum MessageOutputTypes {
    Input = 'input',
    Focus = 'focus',
    Blur = 'blur',
    Submit = 'submit'
}

export enum MessageOutputPages {
    Authorization = 'autorization',
    Registration = 'registration',
    Profile = 'profile',
    Password = 'password',
    Chats = 'chat'
}

export interface MessageOutputProps {
    event: Event,
    context?: any,
    type?: string,
    page?: string
}

interface AuthorizationDataType {
    login?: string,
    password?: string,
    email?: string,
    name?: string,
    secondName?: string,
    phone?: string,
    passwordCheck?: string,
    displayName?: string,
    oldPassword?: string,
}

interface ErrorMessageType {
    errorMessageLogin?: string,
    errorMessagePassword?: string,
    errorMessageEmail?: string,
    errorMessageName?: string,
    errorMessageSecondName?: string,
    errorMessagePhone?: string,
    errorMessagePasswordCheck?: string,
    errorMessageDisplayName?: string,
}

type ErrorResultType = {
    login?: string,
    password?: string,
    email?: string,
    first_name?: string,
    second_name?: string,
    phone?: string,
    passwordCheck?: string,
    display_name?: string,
    oldPassword?: string,
    newPassword?: string,
}

export const messageOutput = (props: MessageOutputProps) => {
    const inputEl = props.event.target as HTMLInputElement;
    const empty = '';

    const errorMessage = validateForm([
        {type: ValidateRuleType.Login, value: inputEl.value},
        {type: ValidateRuleType.Password, value: inputEl.value},
        {type: ValidateRuleType.Email, value: inputEl.value},
        {type: ValidateRuleType.Name, value: inputEl.value},
        {type: ValidateRuleType.SecondName, value: inputEl.value},
        {type: ValidateRuleType.Phone, value: inputEl.value},
        {type: ValidateRuleType.PasswordCheck, value: inputEl.value},
        {type: ValidateRuleType.DisplayName, value: inputEl.value},
    ]);


    if (inputEl.name === ValidateRuleType.AddUser) {
        props.context.refs.addUser.refs.errorField.setProps({
            error: errorMessage.errorMessageLogin
        });
    } else if (inputEl.name === ValidateRuleType.RemoveUser) {
        props.context.refs.removeUser.refs.errorField.setProps({
            error: errorMessage.errorMessageLogin
        })
    }


    if (inputEl.name === ValidateRuleType.Login) {
        props.context.refs.loginInput.refs.errorField.setProps({
            error: errorMessage.errorMessageLogin
        });
    } else if (inputEl.name === ValidateRuleType.Password) {
        props.context.refs.passwordInput.refs.errorField.setProps({
            error: errorMessage.errorMessagePassword
        })
    } else if (inputEl.name === ValidateRuleType.Email) {
        props.context.refs.emailInput.refs.errorField.setProps({
            error: errorMessage.errorMessageEmail
        })
    } else if (inputEl.name === ValidateRuleType.Name) {
        props.context.refs.nameInput.refs.errorField.setProps({
            error: errorMessage.errorMessageName
        })
    } else if (inputEl.name === ValidateRuleType.SecondName) {
        props.context.refs.secondNameInput.refs.errorField.setProps({
            error: errorMessage.errorMessageSecondName
        })
    } else if (inputEl.name === ValidateRuleType.Phone) {
        props.context.refs.phoneInput.refs.errorField.setProps({
            error: errorMessage.errorMessagePhone
        })
    } else if (inputEl.name === ValidateRuleType.PasswordCheck) {
        props.context.refs.passwordCheckInput.refs.errorField.setProps({
            error: errorMessage.errorMessagePasswordCheck
        })
    } else if (inputEl.name === ValidateRuleType.DisplayName) {
        props.context.refs.displayNameInput.refs.errorField.setProps({
            error: errorMessage.errorMessageDisplayName
        })
    }

    if (props.type === MessageOutputTypes.Focus) {
        if (inputEl.name == ValidateRuleType.Login) {
            props.context.refs.loginInput.refs.errorField.setProps({
                error: empty
            });
        } else if (inputEl.name == ValidateRuleType.Password) {
            props.context.refs.passwordInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.Email) {
            props.context.refs.emailInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.Name) {
            props.context.refs.nameInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.SecondName) {
            props.context.refs.secondNameInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.Phone) {
            props.context.refs.phoneInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.PasswordCheck) {
            props.context.refs.passwordCheckInput.refs.errorField.setProps({
                error: empty
            })
        } else if (inputEl.name === ValidateRuleType.DisplayName) {
            props.context.refs.displayNameInput.refs.errorField.setProps({
                error: empty
            })
        }

        return;
    }

    if (props.type === MessageOutputTypes.Submit) {
        props.event.preventDefault();

        let authorizationData!: AuthorizationDataType;
        let result!: ErrorResultType;
        let errorMessage!: ErrorMessageType;

        if (props.page === MessageOutputPages.Authorization) {
            authorizationData = {
                login: (props.context.refs.loginInput.refs.inputField.getContent() as HTMLInputElement).value,
                password: (props.context.refs.passwordInput.refs.inputField.getContent() as HTMLInputElement).value,
            }

            result = {
                login: authorizationData.login!,
                password: authorizationData.password!
            }

            errorMessage = validateForm([
                {type: ValidateRuleType.Login, value: authorizationData.login!},
                {type: ValidateRuleType.Password, value: authorizationData.password!}
            ])
        } else if (props.page === MessageOutputPages.Registration){
            authorizationData = {
                login: (props.context.refs.loginInput.refs.inputField.getContent() as HTMLInputElement).value,
                password: (props.context.refs.passwordInput.refs.inputField.getContent() as HTMLInputElement).value,
                email: (props.context.refs.emailInput.refs.inputField.getContent() as HTMLInputElement).value,
                name: (props.context.refs.nameInput.refs.inputField.getContent() as HTMLInputElement).value,
                secondName: (props.context.refs.secondNameInput.refs.inputField.getContent() as HTMLInputElement).value,
                phone: (props.context.refs.phoneInput.refs.inputField.getContent() as HTMLInputElement).value,
                passwordCheck: (props.context.refs.passwordCheckInput.refs.inputField.getContent() as HTMLInputElement).value,
            }
            result = {
                login: authorizationData.login!,
                password: authorizationData.password!,
                email: authorizationData.email,
                first_name: authorizationData.name,
                second_name: authorizationData.secondName,
                phone: authorizationData.phone
            }

            errorMessage = validateForm([
                {type: ValidateRuleType.Login, value: authorizationData.login!},
                {type: ValidateRuleType.Password, value: authorizationData.password!},
                {type: ValidateRuleType.Email, value: authorizationData.email!},
                {type: ValidateRuleType.Name, value: authorizationData.name!},
                {type: ValidateRuleType.SecondName, value: authorizationData.secondName!},
                {type: ValidateRuleType.Phone, value: authorizationData.phone!},
                {type: ValidateRuleType.PasswordCheck, value: authorizationData.passwordCheck!},
            ])
        } else if (props.page === MessageOutputPages.Profile) {
            authorizationData = {
                login: (props.context.refs.loginInput.refs.inputField.getContent() as HTMLInputElement).value ,
                email: (props.context.refs.emailInput.refs.inputField.getContent() as HTMLInputElement).value,
                name: (props.context.refs.nameInput.refs.inputField.getContent() as HTMLInputElement).value,
                secondName: (props.context.refs.secondNameInput.refs.inputField.getContent() as HTMLInputElement).value,
                phone: (props.context.refs.phoneInput.refs.inputField.getContent() as HTMLInputElement).value,
                displayName: (props.context.refs.displayNameInput.refs.inputField.getContent() as HTMLInputElement).value,
            }

            result = {
                login: authorizationData.login,
                email: authorizationData.email,
                first_name: authorizationData.name,
                second_name: authorizationData.secondName,
                phone: authorizationData.phone,
                display_name: authorizationData.displayName,
            }

            errorMessage = validateForm([
                {type: ValidateRuleType.Login, value: authorizationData.login!},
                {type: ValidateRuleType.Email, value: authorizationData.email!},
                {type: ValidateRuleType.Name, value: authorizationData.name!},
                {type: ValidateRuleType.SecondName, value: authorizationData.secondName!},
                {type: ValidateRuleType.Phone, value: authorizationData.phone!},
                {type: ValidateRuleType.DisplayName, value: authorizationData.displayName!},
            ])
        } else if(props.page === MessageOutputPages.Password) {
            authorizationData = {
                password: (props.context.refs.passwordInput.refs.inputField.getContent() as HTMLInputElement).value,
                passwordCheck: (props.context.refs.passwordCheckInput.refs.inputField.getContent() as HTMLInputElement).value,
                oldPassword: (props.context.refs.oldPassword.refs.inputField.getContent() as HTMLInputElement).value
            }

            result = {
                newPassword: authorizationData.password!,
                passwordCheck: authorizationData.passwordCheck,
                oldPassword: authorizationData.oldPassword
            }

            errorMessage = validateForm([
                {type: ValidateRuleType.Password, value: authorizationData.password!},
                {type: ValidateRuleType.PasswordCheck, value: authorizationData.passwordCheck!},
            ])
        } else if(props.page === MessageOutputPages.Chats) {
            if (inputEl.textContent === 'Добавить') {
                authorizationData = {
                    login: (props.context.refs.addUser.refs.inputField.getContent() as HTMLInputElement).value
                }

                result = {
                    login: authorizationData.login!,
                }

                errorMessage = validateForm([
                    {type: ValidateRuleType.Login, value: authorizationData.login!},
                ])

            } else if (inputEl.textContent === 'Удалить') {
                authorizationData = {
                    login: (props.context.refs.removeUser.refs.inputField.getContent() as HTMLInputElement).value
                }

                result = {
                    login: authorizationData.login!,
                }

                errorMessage = validateForm([
                    {type: ValidateRuleType.Login, value: authorizationData.login!},
                ])
            }
        }

        props.context.setProps({
            errorMessage,
            loginValue: authorizationData.login,
            passwordValue: authorizationData.password,
            emailValue: authorizationData.email,
            nameValue: authorizationData.name,
            secondNameValue: authorizationData.secondName,
            phoneValue: authorizationData.phone,
            passwordCheckValue: authorizationData.passwordCheck,
            displayName: authorizationData.displayName

        })

        if (errorMessage.errorMessageLogin === '' &&
            errorMessage.errorMessagePassword === '' &&
            errorMessage.errorMessageEmail === '' &&
            errorMessage.errorMessageName === '' &&
            errorMessage.errorMessageSecondName === '' &&
            errorMessage.errorMessagePhone === '' &&
            errorMessage.errorMessagePasswordCheck === '' &&
            errorMessage.errorMessageDisplayName === '') {
        }

        return {result, errorMessage};
    }
}
