import { Block } from 'core';
import './chat-list';
import { ChatItemProps } from 'components/chat-item/chat-item';

type ChatListProps = {
    chatList: ChatItemProps[],
    title: string,
    unread_message?: number,
    lastMessage: string,
    chatAvatar: string,
}

export class ChatList extends Block {
    static cName = 'ChatList';

    constructor(props: ChatListProps) {
        super(props)
    }
    protected render() {
        return `
            <div class="chat-list custom-scrollbar">
            {{#each chatList}}
                <div class="chat__item" data-id={{id}}  onclick='handleChats({{id}})'>
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
            {{/each}}
            </div>
        `
    }
}
