import { DispatchStateHandler, User } from '../../typings/app';
import apiHasError from 'helpers/apiHasError';
import usersAPI from 'api/usersAPI';
import authAPI from 'api/authAPI';
import { transformUser } from 'helpers/apiTransformers';

type ChangeUserPayload = {
    data: User
}

export const changeUserProfile: DispatchStateHandler<ChangeUserPayload> = async (
    dispatch,
    state,
    action
) => {
    try {
        dispatch({isLoading: true});

        const response = await usersAPI.changeProfile(action);

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
    } catch(err) {
        console.log(err);
    }
}

type ChangeAvatarPayload = {
    form: FormData
}

export const changeUserAvatar: DispatchStateHandler<ChangeAvatarPayload> = async (
    dispatch,
    state,
    form
) => {
    try{
        dispatch({isLoading: true});

        const response = await usersAPI.changeAvatar(form as unknown as FormData);

        if (!response.ok) {
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
    } catch(err) {
        console.log(err);
    }
}

export const changeUserPassword: DispatchStateHandler<ChangeUserPayload> = async (
    dispatch,
    state,
    data
) => {
    try {
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
    } catch(err) {
        console.log(err)
    }
}

type SearchUserPayload = {
    login: string
}

export const searchUsers: DispatchStateHandler<SearchUserPayload> = async (
    dispatch,
    state,
    login,
) => {
    try {
        const response = await usersAPI.searchUser(login as unknown as string) as XMLHttpRequest;
        dispatch({userList: response.response});
    } catch(err) {
        console.log(err);
    }
}
