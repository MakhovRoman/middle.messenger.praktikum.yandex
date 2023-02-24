import { withRouter } from 'helpers/withRouter';
import Block from '../../core/Block';
export class Page500 extends Block {
    static cName = 'Page500';

    constructor() {
        super();

        this.setProps({
            onClick: this.onClick.bind(this)
        })
    }

    onClick(event: Event) {
        event.preventDefault();
        window.router.go('/messenger')
    }

    componentDidUpdate() {
        return window.store.getState().screen === '500';
    }

    protected render() {
        return `
            <main class="wrapper-page-error">
                <div class="content-page-error">
                    <h1 class="content-page-error__title">500</h1>
                    <p class="content-page-error__paragraph">Мы уже фиксим</p>
                    {{{BackToChatLink onClick=onClick}}}
                </div>
            </main>
        `;
    }
}

export default withRouter(Page500);
