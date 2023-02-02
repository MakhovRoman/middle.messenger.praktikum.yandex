import { Block } from 'core';
import template from './messages-content.hbs'
import { withStore } from 'helpers/withStore';

type MessagesContentProps = {
    data: Record<string, unknown>
  }

  export class MessagesContent extends Block {
    static cName = 'MessagesContent';
    // eslint-disable-next-line no-useless-constructor
    constructor(props:MessagesContentProps) {
      super(props);


    }

    // eslint-disable-next-line class-methods-use-this
    render() {
      return `
              {{#each messageContent}}
                <div class="chat__message-date">
                    <span>{{date}}</span>
                </div>
                {{#each messageContent.messages}}
                    {{#if myContent}}
                        <div class="chat__message-out chat__message-wrapper">
                            <div class="chat__message-content">
                                <span>
                                    {{myContent}}
                                </span>
                                <div class="chat__message-time">
                                    <span>{{time}}</span>
                                </div>
                            </div>
                        </div>
                    {{/if}}
                    {{#if alienContent}}
                        <div class="chat__message-in chat__message-wrapper">
                            <div class="chat__message-content">
                                <span>
                                    {{myContent}}
                                </span>
                                <div class="chat__message-time">
                                    <span>{{time}}</span>
                                </div>
                            </div>
                        </div>
                    {{/if}}
                {{/each}}
              {{/each}}
      `
    }
  }

function fn(state = window.store.getState()) {
  return {
    messageContent: state.messageContent
  }
}

export default withStore(MessagesContent, fn);
