import {  renderDOM, registerComponent} from 'core';
import { MockedPathRouter } from 'tests/mockedPathRouter';
import * as components from 'components';
import { Store, defaultState } from 'core/Store';
import { AppState } from '../../typings/app';
import { initRouter } from 'core/Router/Router';
import { sleep } from 'helpers/sleep';
import { BlockClass } from 'core/Block';
import { PathRouter } from 'core/Router/PathRouter';

type RenderBlockParams<T extends Record<string, unknown>> = {
	Block: BlockClass<T>;
	props: T;
	state?: Partial<AppState>;
};

export async function renderBlock<T extends Record<string, unknown>>({
	Block,
	props,
	state = defaultState,
}: RenderBlockParams<T>) {
	Object.values(components).forEach((Component: any) => {
		registerComponent(Component);
	});

	const store = new Store<AppState>({ ...defaultState, ...state });
	const router = new PathRouter();

	window.router = router;
	window.store = store;

	document.body.innerHTML = '<div id="app"></div>';

	// @ts-ignore
	renderDOM(new Block(props as T));

	initRouter(router, store);

	await sleep();
}

export async function step(name: string, callback: () => void) {
	console.log(`Step: ${name}`);
	await callback();
}
