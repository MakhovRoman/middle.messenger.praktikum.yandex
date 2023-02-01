import { Block } from 'core';

export interface ChatItemProps {
    id: number,
    title: string,
    unread_message: number,
    last_message: string,
    avatar: string,
    onCheck: () => void
}

export class ChatItem extends Block {
    static cName = 'ChatItem';
    constructor({onCheck, ...props}: ChatItemProps) {
        super({
            ...props,
            events : {
                click: onCheck
            }
        });
    }

    protected render() {
        return `
            <div class="chat__item" data-id="{{id}}"  onCheck={{onCheck}}>
                <div class="chat__item-container">
                    <div class="chat__avatar-wrapper">
                        <div class="chat__avatar-content">
                            {{#if avatar}}
                            <img src="{{avatar}}" alt="Аватар">
                            {{else}}
                            <img src='https://www.svgrepo.com/download/5158/chat.svg' alt="Аватар">
                            {{/if}}
                        </div>
                    </div>
                    <div class="chat__info">
                        <div class="chat__info-top chat__info-row">
                            <div class="chat__info-title">
                                <h3>{{title}}</h3>
                            </div>
                            <div class="chat__info-date">
                                <span>12:00</span>
                            </div>
                        </div>
                        <div class="chat__info-bot chat__info-row">

                            <div class="chat__info-message">
                                <p>{{last_message.content}}</p>
                            </div>

                            {{#if unread_message}}
                            <div class="chat__info-unread">
                                <span>{{unread_message}}</span>
                            </div>
                            {{/if}}
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
