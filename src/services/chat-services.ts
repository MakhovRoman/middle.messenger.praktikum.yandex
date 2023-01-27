import { Dispatch } from 'core/Store';
import { AppState, User } from '../../typings/app';
import apiHasError from 'helpers/apiHasError';
import { transformUser } from 'helpers/apiTransformers';
import { UserDTO } from 'api/types';
import chatAPI from 'api/chatsAPI';
import authAPI from 'api/authAPI';
import URL from '../api/urls';

type T = Record<string, unknown>;

export const createChat = async(
    dispatch: Dispatch<AppState>,
    state: AppState,
    data: string
) => {
    dispatch({isLoading: true});

    // const createChat = await chatAPI.createChat(data)  as XMLHttpRequest;

    // if (apiHasError(createChat)) {
    //     //@ts-expect-error
    //     dispatch({isLoading: false, loginFormError: createChat.response.reason});
    //     return;
    // }

    const getChat = await chatAPI.getChats() as XMLHttpRequest;

    if (apiHasError(getChat)) {
        dispatch({isLoading: false, loginFormError: getChat.response.reason});
        return;
    }

    const chatsArr: T[] = getChat.response;
    const chatObj = chatsArr.reduce((result, item, index) => {
        result[index] = item;

        if ((result[index] as T).avatar) {
            (result[index] as T).avatar = `${URL.RESOURCES}${(result[index] as T).avatar}`;
        } else {
            (result[index] as T).avatar = 'https://img.icons8.com/ios/50/null/icq.png';
        }

        return result;
    }, {});

    dispatch({chats: null});
    dispatch({chats: chatObj});
    console.log(chatsArr, chatObj);
}
