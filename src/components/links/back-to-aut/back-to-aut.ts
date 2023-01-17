import template from 'bundle-text:./back-to-aut.hbs';
import Block from 'core/Block';

export class BackToAutLink extends Block {
    static cName = 'BackToAutLink';
    protected render() {
        return template;
    }
}
