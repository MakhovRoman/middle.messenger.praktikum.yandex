import Block from 'core/Block';
import { withRouter } from 'helpers/withRouter';
export class Page404 extends Block {
    static cName = 'Page404';

    componentDidUpdate() {
        return window.store.getState().screen === 'page404';
    }

    protected render() {
        return `
            {{{ErrorPage title="404" cont="Не туда попали"}}}
        `;
    }
}

export default withRouter(Page404)
