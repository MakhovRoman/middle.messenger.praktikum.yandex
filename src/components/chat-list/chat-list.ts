import { Block } from 'core';

export class ChatList extends Block {
    static cName = 'ChatList';
    protected render() {
        return `
            <div class="chat-list custom-scrollbar">
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
                {{{ChatItem onCheck=onCheck}}}
            </div>
        `
    }
}