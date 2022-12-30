import { Block } from "core";
import template from 'bundle-text:./error-page.hbs';

export class ErrorPage extends Block {
    protected render():string {
        return template;
    }
}
