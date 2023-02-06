import template from 'bundle-text:./back-to-chat.hbs';
import Block from 'core/Block';

interface BackToChatLinkProps {
    onClick: () => void
}

export class BackToChatLink extends Block {
    static cName = 'BackToChatLink';

    constructor({onClick}: BackToChatLinkProps) {
        super({events: {click: onClick}});
    }
    protected render() {
        return `
        <button class="link back-to__link" onClick>Назад к чатам</button>
        `
    }
}
