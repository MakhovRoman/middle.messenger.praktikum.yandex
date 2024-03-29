import Block from 'core/Block';

interface LinkProps {
    onClick?: () => void,
    href?: string,
    class?: string,
    title?: string,
    dataTestId?: string
}

export class Link extends Block {
    static cName = 'Link';
    constructor({onClick, ...props}: LinkProps) {
        super({
            ...props,
            events: {
                click: onClick
            }
        })
    }
    protected render() {
        return `
            <a href="{{href}}" class="{{class}}" {{#if dataTestId}}data-testid="{{dataTestId}}"{{/if}}>{{title}}</a>
        `
    }
}
