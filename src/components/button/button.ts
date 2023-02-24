import Block from 'core/Block';

interface ButtonProps {
    text: string;
    name?: string;
    dataTestId?: string,
    onSubmit?: () => void;
    isLink: boolean
}

export class Button extends Block {
    static cName = 'Button';
    constructor({onSubmit, ...props}: ButtonProps) {
        super({
            ...props,
            events: {click: onSubmit}
        });
    }

    protected render() {
        return `
            <button
                type="submit"
                {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}
                class="button button-submit">{{text}}
            </button>
        `;
    }
}
