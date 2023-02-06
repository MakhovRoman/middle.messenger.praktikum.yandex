import Block from 'core/Block';

interface InputControlledProps {
    onInput?: () => void;
    onFocus?: () => void;
    onBlur?: () => void;
    type?: 'tel' | 'text' | 'password' | 'email' | 'file';
    placeholder?: string;
    value?: string;
    error?: string;
    status?: string;
    class?: string;
    id?: string;
}

export class InputControlled extends Block {
    static cName = 'InputControlled';
    protected render():string {
        return `
        <div class="form__item">
            {{{Input
                onInput=onInput
                onFocus=onFocus
                onBlur=onBlur
                type="{{type}}"
                name="{{name}}"
                placeholder=placeholder
                ref="inputField"
                value=value
                class=class
                status=status
            }}}
            {{{InputError error=error ref="errorField"}}}
        </div>
        `;
    }
}
