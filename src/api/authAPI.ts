import { HTTPTransport } from 'helpers/HTTPTransport';
import { BaseAPI } from './baseAPI';
import URL from './urls';

type SignInRequestType = {
    login: string,
    password: string
}

class AuthAPI extends BaseAPI {
    signUp(obj: Record<string, unknown>) {
        return new HTTPTransport().post(`${URL.SIGN_UP}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: obj,
        });
    }

    getUserInfo() {
        return new HTTPTransport().get(`${URL.USER_INFO}`, {});
    }

    signIn(obj: SignInRequestType) {
        return new HTTPTransport().post(`${URL.SIGN_IN}`, {
            headers: {
                'content-type': 'application/json',
            },
            data: obj
        });
    }

    logout() {
        return new HTTPTransport().post(`${URL.LOGOUT}`, {});
    }
}

const authAPI = new AuthAPI();
export default authAPI;
