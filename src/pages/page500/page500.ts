import Block from '../../core/Block';
export class Page500 extends Block {
    static cName = 'Page500';
    render() {
        return `
            {{{ErrorPage title="500" cont="Мы уже фиксим"}}}
        `
    }
}
