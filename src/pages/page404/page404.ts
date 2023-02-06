import Block from 'core/Block';
import { withRouter } from 'helpers/withRouter';

export class Page404 extends Block {
    static cName = 'Page404';

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
        return window.store.getState().screen === '404';
    }

    protected render() {
        return `
            <main class="wrapper-page-error">
                <div class="content-page-error">
                    <h1 class="content-page-error__title">404</h1>
                    <p class="content-page-error__paragraph">Страница не найдена</p>
                    {{{BackToChatLink onClick=onClick}}}
                </div>
            </main>
        `;
    }
}

export default withRouter(Page404)
