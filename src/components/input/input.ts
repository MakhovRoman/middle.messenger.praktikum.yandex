import Block from 'core/Block';

export interface InputProps {
    onInput?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    onPick?: () => void;
    type?: 'tel' | 'text' | 'password' | 'email' | 'file';
    placeholder?: string;
    value?: string;
    name?: string;
    status?: string;
    id?: string;
    accept?: string;
    class?: string;
    autofocus?: string
    }

export class Input extends Block {
    static cName = 'Input';

    constructor({onInput, onFocus, onBlur, onPick, ...props}: InputProps) {
        super({
            ...props,
            events: {
                input: onInput,
                focus: onFocus,
                blur: onBlur,
                change: onPick,
            }
        });
    }

    protected render() {
        return `
        <input
            class="{{class}}"
            type="{{type}}"
            placeholder="{{placeholder}}"
            {{#if value}}value="{{value}}"{{/if}}
            name="{{name}}"
            {{status}}
            {{#if id}}id={{id}}{{/if}}
            {{#if accept}}accept={{accept}}{{/if}}
            {{#if onPick}}onPick = {{onPick}}{{/if}}
            {{#if onInput}}onInput = {{onInput}}{{/if}}
            {{#if autofocus}}autofocus= {{autofocus}}{{/if}}
        >
        `
    }
}
