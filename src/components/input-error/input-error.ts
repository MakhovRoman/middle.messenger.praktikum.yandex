import Block from 'core/Block';

interface ErrorProps {
    error?: string;
}

export class InputError extends Block<ErrorProps> {
    static cName = 'InputError';
    protected render() {
        return `
            <div class="form__item-status">{{error}}</div>
        `;
    }
}
