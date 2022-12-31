import Block from 'core/Block';
import template from 'bundle-text:./button.hbs';

interface ButtonProps {
    text: string;
    onSubmit?: () => void;
}

export class Button extends Block {
    static cName = 'Button';
    constructor({text, onSubmit}: ButtonProps) {
        super({text, events: {click: onSubmit}});
    }

    protected render() {
        return template;
    }
}
