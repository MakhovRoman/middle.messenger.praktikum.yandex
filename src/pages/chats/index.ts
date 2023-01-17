import { Block, renderDOM, registerComponent }  from 'core';

import { Input } from 'components/input/input';
import { Button } from 'components/button/button';

import 'styles/style.css';
import { BackToChatLink } from 'components/links/back-to-chat/back-to-chat';
import { InputError } from 'components/input-error/input-error';
import inputControlled from 'components/input-controlled';
import { Chats } from './chats';
import { ChatItem } from 'components/chat-item/chat-item';
import { ChatList } from 'components/chat-list/chat-list';
import { ChatDialogTop } from 'components/chat-dialog-top/chat-dialog-top';
import { ChatMessageGroup } from 'components/chat-message-group/chat-message-group';
import { ChatDialogBot } from 'components/chat-dialog-bot/chat-dialog-bot';

import './chats.css';

registerComponent(Input);
registerComponent(Button);
registerComponent(Chats);
registerComponent(ChatList);
registerComponent(ChatItem);
registerComponent(ChatDialogTop);
registerComponent(BackToChatLink);
registerComponent(InputError);
registerComponent(inputControlled);
registerComponent(ChatMessageGroup);
registerComponent(ChatDialogBot);

document.addEventListener('DOMContentLoaded', () => {
  renderDOM(new Chats());
});
