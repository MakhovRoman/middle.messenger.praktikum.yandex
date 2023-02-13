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
        const response = await authAPI.getUserInfo() as XMLHttpRequest;

        if (response.status !== 200) {
            window.router.replace('/');
        }

        if (hasError(response)) {
            return;
        }


        //@ts-ignore
        dispatch({user: transformUser(response.response as UserDTO), loading: false});

        // if(!window.store.getStat().user) {
        //     console.log('ggg')
        //     window.router.go('/');
        // }



        const responseChat = await chatAPI.getChats();

        if(hasError(responseChat)) {
            dispatch({isLoading: false, loginFormError: responseChat.response});
        }
        //@ts-ignore
        dispatch({isLoading: false, loginFormError: null, chats: responseChat.response});

        // if(!window.store.getState().user) {
        //     console.log('dgdfgdfgfd')
        //     if(['/settings', '/messenger'].includes(window.location.pathname)) {
        //         console.log('ERROR')
        //         window.router.replace('/');
        //     }
        // }
        //  else {
        //     window.router.go('/messenger');
        // }
    } catch(err) {
        console.error(err)
    } finally {
        dispatch({appIsInited: true});
    }
}


export default initApp;
