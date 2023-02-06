import { Dispatch } from 'core/Store';
import { AppState, User } from '../../typings/app';
import authAPI from 'api/authAPI';
import apiHasError from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';
import chatAPI from 'api/chatsAPI';

type LoginLoad = {
    login: string;
    password: string;
}

export const login = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: LoginLoad
) => {
    try {
        dispatch({isLoading: true});

        const response = await authAPI.signIn(data);

        if (apiHasError(response)) {
            dispatch({isLoading: false, loginFormError: response.response.reason});
            return;
        }

        const responseUser = await authAPI.getUserInfo();

        if (apiHasError(response)) {
            dispatch(logout);
            return;
        }

        //@ts-expect-error
        dispatch({user: transformUser(responseUser.response as UserDTO)});

        const responseChat = await chatAPI.getChats();

        if(apiHasError(responseChat)) {
            dispatch({isLoading: false, loginFormError: responseChat.response});
        }
        //@ts-expect-error
        dispatch({isLoading: false, loginFormError: null, chats: responseChat.response});
        console.log('login')
        window.router.go('/messenger');
    } catch(err) {
        console.log(err);
    }
};

export const logout = async(dispatch: Dispatch<AppState>) => {
    try {
        console.log('logout')
        dispatch({isLoading: true});
        await authAPI.logout();
        dispatch({isLoading: false, user: null});
        window.router.go('/');
    } catch(err) {
        console.log(err);    }

}

export const signUp = async(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: User
) => {
    try{
        dispatch({isLoading: true});

        const response = await authAPI.signUp(data);

        if (apiHasError(response)) {
            dispatch({isLoading: false, loginFormError: response.reason});
            return;
        }

        const responseUser = await authAPI.getUserInfo();

        dispatch({isLoading: false, loginFormError: null});

        if (apiHasError(responseUser)) {
            return;
        }
        //@ts-expect-error
        dispatch({user: transformUser(responseUser.response as UserDTO)});

        window.router.go('/settings');
    } catch(err) {
        console.log(err);
    }
}
