import { registerComponent, renderDOM } from 'core';
import * as components from './components';
import { BlockConstructable } from 'core/registerComponent';
import { Store, defaultState } from 'core/Store';
import { PathRouter } from 'core/Router/PathRouter';
import { initRouter } from 'core/Router/Router';
import { AppState } from '../typings/app';
import Loader from 'pages/loader';
import initApp from './services/initApp';


Object.values(components).forEach((Component: BlockConstructable) => {
    registerComponent(Component);
});

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store<AppState>(defaultState);
    const router = new PathRouter();

    window.router = router;
    window.store = store;



    renderDOM(new Loader({}));

    // store.on('changed', (prevState, nextState) => {
    //   if(process.env.DEBUG) {
    //     console.log(
    //       '%cstore updated',
    //       'background: #222; color: #bada55',
    //       prevState, nextState,
    //     );
    //   }
    // });

    initRouter(router, store);

    store.dispatch(initApp);
});
