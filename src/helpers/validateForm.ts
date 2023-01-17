export enum ValidateRuleType  {
    Login = 'login',
    Password = 'password',
    Email = 'email',
    Name = 'first_name',
    SecondName = 'second_name',
    Phone = 'phone',
    PasswordCheck = 'check_password',
    DisplayName = 'display_name'
}

const regExpValidate = {
    Login: /^(?=^.{3,20}$)((?=.*\d)|(?=.*\W?))(?![.\n])(?=.*[A-Za-z]).*$/,
    Password: /(?=^.{8,40}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*/,
    Email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    Name: /^[A-ZА-ЯЁ]{1,}[-A-Za-zА-Яа-яЁё]{0,}$/,
    Phone: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/
}

export type ValidateRule = {
    value: string
    type: ValidateRuleType
}

export function validateForm(rules: ValidateRule[]) {
    let errorMessageLogin = '';
    let errorMessagePassword = '';
    let errorMessageEmail = '';
    let errorMessageName = '';
    let errorMessageSecondName = '';
    let errorMessagePhone = '';
    let errorMessagePasswordCheck = '';
    let errorMessageDisplayName = '';


    for(let i = 0; i < rules.length; i++) {
        const {type, value} = rules[i];

        if (type === ValidateRuleType.Login) {
            if (value.length === 0) {
                errorMessageLogin = 'Логин не может быть пустым';
            } else if (value.length < 3) {
                errorMessageLogin = 'Логин должен содержать больше 3 символов';
            } else if (value.length > 20) {
                errorMessageLogin = 'Логин должен содержать меньше 20 символов';
            } else if (!regExpValidate.Login.test(value)) {
                errorMessageLogin = 'Логин не удовлетворяет требованиям';
            }
        }

        if (type === ValidateRuleType.Password) {
            if (value.length === 0) {
                errorMessagePassword = 'Пароль не может быть пустым';
            } else if (value.length < 8) {
                errorMessagePassword = 'Пароль должен содержать больше 8 символов';
            } else if (value.length > 40) {
                errorMessagePassword = 'Пароль должен содержать меньше 40 символов';
            } else if (!regExpValidate.Password.test(value)) {
                errorMessagePassword = 'Пароль не удовлетворяет требованиям';
            }
        }

        if (type === ValidateRuleType.Email) {
            if (value.length === 0 ) {
                errorMessageEmail = 'E-mail не может быть пустым';
            } else if(!regExpValidate.Email.test(value)) {
                errorMessageEmail = 'E-mail не удовлетворяет требованиям'
            }
        }

        if (type === ValidateRuleType.Name) {
            if (value.length === 0) {
                errorMessageName = 'Имя не может быть пустым'
            } else if (!regExpValidate.Name.test(value)) {
                errorMessageName = 'Имя не удовлетворяет требованиям'
            }
        }

        if (type === ValidateRuleType.DisplayName) {
            if (value.length === 0) {
                errorMessageDisplayName = 'Имя не может быть пустым'
            } else if (!regExpValidate.Name.test(value)) {
                errorMessageDisplayName = 'Имя не удовлетворяет требованиям'
            }
        }

        if (type === ValidateRuleType.SecondName) {
            if (value.length === 0) {
                errorMessageSecondName = 'Фамилия не может быть пустой'
            } else if (!regExpValidate.Name.test(value)) {
                errorMessageSecondName = 'Фамилия не удовлетворяет требованиям'
            }
        }

        if (type === ValidateRuleType.Phone) {
            if (value.length === 0) {
                errorMessagePhone = 'Телефон не может быть пустой'
            } else if (!regExpValidate.Phone.test(value)) {
                errorMessagePhone = 'Телефон не удовлетворяет требованиям'
            }
        }

        if (type === ValidateRuleType.PasswordCheck) {
            let target = document.querySelector('input[type="password"]') as HTMLInputElement;
            if (target) {
                let password = target.value;
                if(value !== password || value === '') {
                    errorMessagePasswordCheck = 'Пароли не совпадают'
                }
            }
        }
    }

    return {
        errorMessageLogin,
        errorMessagePassword,
        errorMessageEmail,
        errorMessageName,
        errorMessageSecondName,
        errorMessagePhone,
        errorMessagePasswordCheck,
        errorMessageDisplayName,
    };
}
