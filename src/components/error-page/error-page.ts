import { Block } from 'core';
import template from 'bundle-text:./error-page.hbs';

export class ErrorPage extends Block {
    static cName = 'ErrorPage';
    protected render():string {
        return template;
    }
}
