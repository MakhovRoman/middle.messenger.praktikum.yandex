import { Block, renderDOM, registerComponent }  from 'core';
import { Page500 } from 'pages/page500/page500';
import { BackToChatLink } from 'components/links/back-to-chat/back-to-chat';
import { ErrorPage } from 'components/error-page/error-page';

import './page500.css';

registerComponent(BackToChatLink);
registerComponent(ErrorPage);

document.addEventListener("DOMContentLoaded", () => {
    renderDOM(new Page500());
  });
