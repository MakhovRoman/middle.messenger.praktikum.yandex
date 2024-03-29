import { Block } from 'core';

interface ChatDialogTopProps {
    currentChatAvatar: string,
    currentChatTitle: string,
    chatDialogCompanion: string,
    onClick: () => void,
}

let tools = new Image();
tools.src = require('asserts/tools.png')

export class ChatDialogTop extends Block {
    static cName = 'ChatDialogTop';
    constructor({onClick, ...props}: ChatDialogTopProps) {
        super({
            ...props,
            events: {
                click: onClick
            }
        })
    }

    protected render() {
        return `
            <div class="chat__dialog-top chat__dialog-row">
                <div class="chat__dialog-companion {{chatDialogCompanion}}">
                    <div class="chat__avatar-content">
                        <img src="{{currentChatAvatar}}" alt="Аватар">
                    </div>
                    <h3 class="chat__dialog-name">{{currentChatTitle}}</h3>
                </div>
                <div class="chat__dialog-tools {{toolsActive}}">
                    <button class="dialog-tools__button" onClick={{onClick}}>
                        <img src="${tools.src}" alt="tools">
                    </button>
                    <div class="chat__modal chat__modal-tools" id="modal-add-user">
                        <div class="chat__modal-item">
                            <label for="popup-add" class="chat__modal-label">
                                <div class="chat__modal-icon">
                                    +
                                </div>
                                <h3 class="chat__modal-text">Добавить пользователя</h3>
                            </label>
                        </div>
                        <div class="chat__modal-item">
                            <label for="popup-remove" class="chat__modal-label">
                                <div class="chat__modal-icon">
                                    ×
                                </div>
                                <h3 class="chat__modal-text">Удалить пользователя</h3>
                            </label>
                        </div>
                        <div class="chat__modal-item">
                            {{{Button
                                text="Удалить чат"
                                onSubmit=onDelete
                            }}}
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
