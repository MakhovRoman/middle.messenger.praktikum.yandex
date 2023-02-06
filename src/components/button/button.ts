import Block from 'core/Block';
import template from 'bundle-text:./button.hbs';

interface ButtonProps {
    text: string;
    name?: string;
    onSubmit?: () => void;
    isLink: boolean
}

export class Button extends Block {
    static cName = 'Button';
    constructor({text, name, isLink, onSubmit}: ButtonProps) {
        super({text, name, isLink, events: {click: onSubmit}});
    }

    protected render() {
        return template;
    }
}
