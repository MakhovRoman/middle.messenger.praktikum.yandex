
import { HTTPTransport, METHODS } from 'helpers/HTTPTransport';
import { BaseAPI } from './baseAPI';
import URL from './urls';

class UsersAPI extends BaseAPI {
    changeProfile(obj: Record<string, unknown>) {
        return new HTTPTransport().put(`${URL.CHANGE_PROFILE}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: obj
        })
    }

    changeAvatar(form: FormData) {
        return fetch(`${URL.CHANGE_AVATAR}`, {
            method: METHODS.PUT,
            credentials: 'include',
            mode: 'cors',
            body: form
        });
    }

    changePassword(obj: Record<string, unknown>) {
        return new HTTPTransport().put(`${URL.CHANGE_PASSWORD}`, {
            headers: {
                'content-type': 'application/json',
            },
            data: obj
        });
    }

    searchUser(login: string) {
        return new HTTPTransport().post(`${URL.USER_INFO}/search`, {
            headers: {
                'content-type': 'applicationj/json'
            },
            data: {
                login
            }
        });
    }

    setAvatar(form: FormData) {
        return fetch(`${URL.RESOURCES}`, {
            method: METHODS.POST,
            credentials: 'include',
            mode: 'cors',
            body: form
        });
    }
}

const usersAPI = new UsersAPI();
export default usersAPI;
