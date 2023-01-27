import { Block } from 'core';

type LoaderProps = {};

export class Loader extends Block<LoaderProps> {
    static cName = 'Loader';

    protected render() {
        console.log('loader');

        return `
            <section class="loader">
                <div class="lds-dual-ring"></div>
            </section>
        `
    }
}

export default Loader;
