import template from 'bundle-text:./back-to-chat.hbs';
import Block from 'core/Block';

export class BackToChatLink extends Block {
    static cName = 'BackToChatLink';
    protected render() {
        return template;
    }
}
