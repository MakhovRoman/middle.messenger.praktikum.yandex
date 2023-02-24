import { Block } from 'core';

interface GoToRegistrationProps {
    onNavigateNext: () => void;
}

export class GoToRegistration extends Block {
    static cName = 'GoToRegistration';

    constructor({onNavigateNext, ...props}: GoToRegistrationProps) {
        super({
            ...props,
            events: {
                click: onNavigateNext
            }
        })
    }

    protected render() {
        return `
            <button class="link back-to__link" onNavigateNext={{onNavigateNext}}>Нет аккаунта?</button>
        `
    }
}
