import { Block } from 'core';

interface GoToAuthorizationProps {
    onNavigateNext: () => void;
}

export class GoToAuthorization extends Block {
    static cName = 'GoToAuthorization';

    constructor({onNavigateNext, ...props}: GoToAuthorizationProps) {
        super({
            ...props,
            events: {
                click: onNavigateNext
            }
        })
    }

    protected render() {

        return `
            <button class="link back-to__link" onNavigateNext={{onNavigateNext}}>Войти</button>
        `
    }
}
