import { Dispatch } from 'core/Store';
import { AppState, User } from '../../typings/app';
import apiHasError from 'helpers/apiHasError';
import usersAPI from 'api/usersAPI';
import authAPI from 'api/authAPI';
import { logout } from './auth-services';
import { transformUser } from 'helpers/apiTransformers';
import chatAPI from 'api/chatsAPI';

export const changeUserProfile = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: User) => {
        dispatch({isLoading: true});

        const response = await usersAPI.changeProfile(data);

        if (apiHasError(response)) {
            dispatch({isLoading: false, loginFormError: response.reason});
            return;
        }

        const responseUser = await authAPI.getUserInfo();

        dispatch({isLoading: false, loginFormError: null});

        if (apiHasError(response)) {
            dispatch({isLoading: false, loginFormError: response.reason});
            return;
        }

        //@ts-expect-error
        dispatch({user: transformUser(responseUser.response as UserDTO)});
        console.log(window.store.getState())
        window.router.go();
    }

export const changeUserAvatar = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    form: FormData
) => {
    dispatch({isLoading: true});

    const response = await usersAPI.changeAvatar(form);

    if (!response.ok) {
        console.log(response)
        dispatch({isLoading: false, loginFormError: response.status.toString()});
        return;
    }

    const responseUser = await authAPI.getUserInfo();

    dispatch({isLoading: false, loginFormError: null});

    if (apiHasError(responseUser)) {
        dispatch({isLoading: false, loginFormError: responseUser.reason});
        return;
    }

    //@ts-expect-error
    dispatch({user: transformUser(responseUser.response as UserDTO)});
    window.router.go();
}

export const changeUserPassword = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: User
) => {
    dispatch({isLoading: true});

    const response = await usersAPI.changePassword(data);

    if (apiHasError(response)) {
        dispatch({isLoading: false, loginFormError: response.reason});
        return;
    }

    const responseUser = await authAPI.getUserInfo();

        dispatch({isLoading: false, loginFormError: null});

        if (apiHasError(response)) {
            dispatch({isLoading: false, loginFormError: response.reason});
            return;
        }

        //@ts-expect-error
        dispatch({user: transformUser(responseUser.response as UserDTO)});
        window.router.go();
}

export const searchUsers = async (
    dispatch: Dispatch<AppState>,
    state: AppState,
    login: string,
) => {
    const response = await usersAPI.searchUser(login) as XMLHttpRequest;
    dispatch({userList: response.response});
}
