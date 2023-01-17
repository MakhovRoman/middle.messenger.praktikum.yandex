import { Block } from 'core';

const images = {
    attach: new Image(),
    photo_blue: new Image(),
    file: new Image(),
    geolocation: new Image()
}

images.attach.src = require('asserts/attach.png');
images.photo_blue.src = require('asserts/photo_blue.png');
images.file.src = require('asserts/file.png');
images.geolocation.src = require('asserts/geolocation.png');

interface ChatDialogBotProps {
    onClick?: () => void;
    onSubmit?: () => void;
}

export class ChatDialogBot extends Block {
    static cName = 'ChatDialogBot';
    constructor({onClick, onSubmit}: ChatDialogBotProps) {
        super({
            events: {
                click: onClick,
                submit: onSubmit
            }
        })
    }


    protected render() {
        return `
            <form name="send-message" action="" class="chat__dialog-bot chat__dialog-row" onSubmit={{onSubmit}}>
                <div class="chat__dialog-attach" >
                    <a class="dialog-attach__icon" onCLick={{onClick}}>
                        <img src=${images.attach.src} alt="attach">
                    </a>
                    <div  class="chat__modal chat__modal-attach" id="modal-attach">
                        <div class="chat__modal-item">
                            <label for="attach-media" class="chat__modal-label">
                                <div class="chat__modal-icon">
                                    <img src=${images.photo_blue.src} alt="photo">
                                </div>
                                <p class="chat__modal-text">Фото или Видео</p>
                            </label>
                            {{{Input
                                onPick=onPick
                                type="file"
                                id="attach-media"
                                accept="image/*,video/*"
                                name="photo_video"
                                ref="loadFile"
                                value=value
                                class="chat__modal-input"
                            }}}
                        </div>
                        <div class="chat__modal-item">
                            <label for="attach-file" class="chat__modal-label">
                                <div class="chat__modal-icon">
                                    <img src=${images.file.src} alt="file">
                                </div>
                                <p class="chat__modal-text">Файл</p>
                            </label>
                            {{{Input
                                onPick=onPick
                                type="file"
                                id="attach-file"
                                name="file"
                                ref="loadFile"
                                value=value
                                class="chat__modal-input"
                            }}}
                        </div>
                        <div class="chat__modal-item">
                            <button id="geolocation" class="chat__modal-label">
                                <div class="chat__modal-icon">
                                    <img src=${images.geolocation.src} alt="geolocation">
                                </div>
                                <p class="chat__modal-text">Локация</p>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="chat__dialog-write">
                    <input type="text"
                        id="chat__dialog-write"
                        name="message"
                        class="dialog-write__input"
                        placeholder="Сообщение"
                    >
                    <button  class="dialog-write__button button" type="submit">
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="14" cy="14" r="14" fill="#3369F3"/>
                            <rect x="8" y="13.2" width="11" height="1.6" fill="white"/>
                            <path d="M15 9L19 14L15 19" stroke="white" stroke-width="1.6"/>
                        </svg>
                    </button>
                </div>
            </form>

        `
    }
}
