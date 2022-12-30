import Block from "core/Block";
import template from "bundle-text:./input-error.hbs";

interface ErrorProps {
    error?: string;
}

export class InputError extends Block<ErrorProps> {

    protected render() {
        return template;
    }
}
