import Block from 'core/Block';

export class Page404 extends Block {
    render() {
        return `
            {{{ErrorPage title="404" cont="Не туда попали"}}}
        `;
    }
}
