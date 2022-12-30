import { Block } from "core";

interface ChatItemProps {
    onCheck?: () => void
}

export class ChatItem extends Block {
    constructor({onCheck}: ChatItemProps) {
        super({
            events: {
                click: onCheck,
            }
        })
    }

    protected render() {
        return `
            <div class="chat__item" onCheck=onCheck>
                <div class="chat__item-container">
                    <div class="chat__avatar-wrapper">
                        <div class="chat__avatar-content"><svg viewBox="0 0 120 120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="50"/></svg>
                        </div>
                    </div>
                    <div class="chat__info">
                        <div class="chat__info-top chat__info-row">
                            <div class="chat__info-title">
                                <h3>Gendalf</h3>
                            </div>
                            <div class="chat__info-date">
                                <span>12:00</span>
                            </div>
                        </div>
                        <div class="chat__info-bot chat__info-row">
                            <div class="chat__info-message">
                                <p>И Human Interface Guidelines и Material Design рекомендуют...</p>
                            </div>
                            <div class="chat__info-unread">
                                <span>10</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
