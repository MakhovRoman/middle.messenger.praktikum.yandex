import { withRouter } from 'helpers/withRouter';
import Block from '../../core/Block';
export class Page500 extends Block {
    static cName = 'Page500';

    componentDidUpdate() {
        return window.store.getState().screen === 'page404';
    }

    render() {
        return `
            {{{ErrorPage title="500" cont="Мы уже фиксим"}}}
        `
    }
}

export default withRouter(Page500);
