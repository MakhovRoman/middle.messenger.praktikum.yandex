import Block from 'core/Block';
// import template from 'bundle-text:./input-error.hbs';

interface ErrorProps {
    error?: string;
}

export class InputError extends Block<ErrorProps> {
    static cName = 'InputError';
    protected render() {
        return `
            <div class="form__item-status">\{{error}}</div>
        `;
    }
}
