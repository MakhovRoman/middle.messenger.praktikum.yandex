import { Block } from 'core';

type LoaderProps = {};

export class Loader extends Block<LoaderProps> {
    static cName = 'Loader';

    protected render() {
        return `
            <main class="loader">
                <div class="lds-dual-ring"></div>
            </main>
        `
    }
}

export default Loader;
