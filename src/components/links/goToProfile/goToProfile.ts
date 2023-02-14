import { Block } from 'core';

interface GoToProfileProps {
    goToProfile: () => void;
}

export class GoToProfile extends Block {
    static cName = 'GoToProfile';

    constructor({goToProfile, ...props}: GoToProfileProps) {
        super({
            ...props,
            events: {
                click: goToProfile
            }
        })
    }

    protected render() {
        return `
            <button class="chats__link" goToProfile={{goToProfile}}>Профиль ❯</button>
        `
    }
}
