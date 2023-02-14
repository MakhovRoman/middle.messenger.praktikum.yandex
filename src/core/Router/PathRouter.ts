import { CoreRouter } from './CoreRouter';

export class PathRouter implements CoreRouter {
    private routes: Record<string, Function> = {};

    private isStarted = false;

    start() {
      if (!this.isStarted) {
        this.isStarted = true;

        window.onpopstate = (event: PopStateEvent) => {
          this.onRouteChange.call(this);
        };

        this.onRouteChange();
      }

      console.log('start router')
    }

    private onRouteChange(pathname: string = window.location.pathname) {
      const found = Object.entries(this.routes).some(([routeHash, callback]) => {
        if (routeHash === pathname) {
          callback();
          return true;
        }
        return false;
      });

      if (!found) {
        if(!window.store?.getState().user) {
          window.router?.replace('/')
        } else {
          window.router?.replace('/404');
        }
      }

      if (window.store?.getState().user && window.store?.getState().screen === '/') {
        window.router?.replace('/messenger');
      }
    }

    use(hash: string, callback: Function) {
      this.routes[hash] = callback;
      return this;
    }

    go(pathname: string) {
      window.history.pushState({}, '', pathname);
      this.onRouteChange(pathname);
    }

    replace(pathname: string) {
      window.history.replaceState({ }, '', pathname);
      this.onRouteChange(pathname);
    }

    back() {
      window.history.back();
    }

    forward() {
      window.history.forward();
    }

    getRoutes() {
      return this.routes;
    }
  }
