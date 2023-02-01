import type { Dispatch } from 'core/Store';
import { AppState } from '../../typings/app';
import authAPI from 'api/authAPI';
import hasError from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';
import chatAPI from 'api/chatsAPI';

async function initApp(dispatch: Dispatch<AppState>) {
    await new Promise(r => setTimeout(r, 1000));

    try {
        console.log('initApp');
        const response = await authAPI.getUserInfo();

        if (hasError(response)) {
            return;
        }

        //@ts-ignore
        dispatch({user: transformUser(response.response as UserDTO)});

        const responseChat = await chatAPI.getChats();

        if(hasError(responseChat)) {
            dispatch({isLoading: false, loginFormError: responseChat.response});
        }
        //@ts-ignore
        dispatch({isLoading: false, loginFormError: null, chats: responseChat.response});

        if(!window.store.getState().user) {
            if(['/profile', '/chat'].includes(window.location.pathname)) {
                window.router.replace('/')
            }
        } else {
            window.router.go('/chat');
        }

    } catch(err) {
        console.error(err)
    } finally {
        dispatch({appIsInited: true});
    }
}


export default initApp;
