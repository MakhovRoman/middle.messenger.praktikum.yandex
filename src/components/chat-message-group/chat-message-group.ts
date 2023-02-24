import { Block } from 'core';

let camera = new Image();
camera.src = require('asserts/camera.png')

export class ChatMessageGroup extends Block {
    static cName = 'ChatMessageGroup';
    protected render() {
        return `
            <div class="chat__message-group">
                <div class="chat__message-date">
                    <span>19 июня</span>
                </div>
                <div class="chat__message-in chat__message-wrapper">
                    <div class="chat__message-content">
                        <span>
                            Привет! Смотри, тут всплыл интересный кусок лунной космической истории —
                            НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для
                            полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500
                            EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности
                            Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад
                            в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так
                            никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали
                            на аукционе за 45000 евро.
                        </span>
                        <div class="chat__message-time">
                            <span>11:56</span>
                        </div>
                    </div>
                </div>
                <div class="chat__message-in chat__message-wrapper chat__message-with-photo">
                    <div class="chat__message-content">
                        <img src="${camera.src}" alt="message-photo">
                        <div class="chat__message-time">
                            <span>11:56</span>
                        </div>
                    </div>
                </div>
                <div class="chat__message-out chat__message-wrapper">
                    <div class="chat__message-content">
                        Круто!!!
                        <div class="chat__message-time">
                        <span>12:00</span>
                        <div class="chat__message-status">
                            <svg width="11" height="5" viewBox="0 0 11 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <line y1="-0.5" x2="3.765" y2="-0.5"
                                transform="matrix(0.705933 0.708278 -0.705933 0.708278 0.700195 2.33301)"
                                stroke="#3369F3"/>
                                <line y1="-0.5" x2="5.6475" y2="-0.5"
                                transform="matrix(0.705933 -0.708278 0.705933 0.708278 3.35828 5)"
                                stroke="#3369F3"/>
                                <line y1="-0.5" x2="5.6475" y2="-0.5"
                                transform="matrix(0.705933 -0.708278 0.705933 0.708278 6.01587 5)"
                                stroke="#3369F3"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
}
