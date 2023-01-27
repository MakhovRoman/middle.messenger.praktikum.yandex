import type { Dispatch } from 'core/Store';
import { AppState } from '../../typings/app';
import authAPI from 'api/authAPI';
import hasError from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';

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

        if(!window.store.getState().user) {
            if(['/profile', '/chat'].includes(window.location.pathname)) {
                window.router.replace('/')
            }
        }

    } catch(err) {
        console.error(err)
    } finally {
        dispatch({appIsInited: true});
    }
}


export default initApp;
