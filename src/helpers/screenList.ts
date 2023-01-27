import { BlockClass } from 'core/Block';
import  Authorization  from 'pages/authorization';
import Chats from 'pages/chats';
import Page404 from 'pages/page404';
import Profile from 'pages/profile';

import  Registration  from 'pages/registration';

export const enum Screens {
    Login = 'login',
    Profile = 'profile',
    Registration = 'registration',
    Page404 = 'page404',
    Chat = 'chat'
}

const map: Record<Screens, BlockClass<any>> = {
    [Screens.Login]: Authorization,
    [Screens.Profile]: Profile,
    [Screens.Registration]: Registration,
    [Screens.Page404]: Page404,
    [Screens.Chat]: Chats
}

export const getScreenComponent = (screen: Screens): BlockClass<any> => {
    return map[screen];
}
