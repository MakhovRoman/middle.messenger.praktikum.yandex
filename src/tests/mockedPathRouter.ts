import { PathRouter } from 'core/Router/PathRouter';


export class MockedPathRouter extends PathRouter {
	go(pathname: string) {
		window.history.pushState({}, '', pathname);
		// @ts-expect-error
		this.onRouteChange();
	}
}
