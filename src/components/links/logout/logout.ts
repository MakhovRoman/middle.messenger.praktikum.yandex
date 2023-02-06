import { Block } from 'core';

interface LogoutLinkProps {
    onLogout: () => void;
}

export class LogoutLink extends Block {
    static cName = 'LogoutLink';

    constructor({onLogout, ...props}: LogoutLinkProps) {
        super({
            ...props,
            events: {
                click: onLogout
            }
        })
    }

    protected render() {

        return `
            <button class="back-to__link profile__exit" onLogout={{onLogout}}>Выйти</button>
        `
    }
}
