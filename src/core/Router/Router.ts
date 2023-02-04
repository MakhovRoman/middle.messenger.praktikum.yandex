import { Screens, getScreenComponent } from 'helpers/screenList';
import { CoreRouter } from './CoreRouter';
import renderDOM from 'core/renderDOM';
import { Store } from 'core/Store';
import { AppState } from '../../../typings/app';


const routes = [
  {
    path: '/',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/settings',
    block: Screens.Profile,
    shouldAuthorized: true,
  },
  {
    path: '/sign-up',
    block: Screens.Registration,
    shouldAuthorized: false,
  },
  {
    path: '/messenger',
    block: Screens.Chat,
    shouldAuthorized: true,
  },
  {
    path: '*',
    block: Screens.Login,
    shouldAuthorized: false,
  },
  {
    path: '/404',
    block: Screens.Page404,
    shouldAuthorized: false,
  },
];

export function initRouter(router: CoreRouter, store: Store<AppState>) {
  routes.forEach(route => {
    router.use(route.path, () => {
      const isAuthorized = Boolean(store.getState().user);
      const currentScreen = Boolean(store.getState().screen);

      if (isAuthorized || !route.shouldAuthorized) {
        store.dispatch({ screen: route.block, appIsInited: true});
        return;
      }

      if (!currentScreen) {
        store.dispatch({ screen: Screens.Login, appIsInited: true});
      }
    });
  });

  /**
   * Глобальный слушатель изменений в сторе
   * для переключения активного экрана
   */

  store.on('changed', (prevState, nextState) => {
    if (!prevState.appIsInited && nextState.appIsInited) {
      router.start();
    }

    if (prevState.screen !== nextState.screen) {
      const Page = getScreenComponent(nextState.screen);
      renderDOM(new Page({}));
      document.title = `App / ${Page.cName}`;
    }
  });

}
