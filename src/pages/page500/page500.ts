import Block from '../../core/Block';
export class Page500 extends Block {
    render() {
        return `
            {{{ErrorPage title="500" cont="Мы уже фиксим"}}}
        `
    }
}
