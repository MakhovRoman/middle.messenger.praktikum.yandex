import Block from 'core/Block';

export class BackToAutLink extends Block {
    static cName = 'BackToAutLink';
    protected render() {
        return `
            <a href="" class="link back-to__link">Войти</a>
        `;
    }
}
