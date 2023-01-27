const enum URL {
    BASE = 'https://ya-praktikum.tech/api/v2',
    AUTH = `${URL.BASE}/auth`,
    SIGN_UP = `${URL.AUTH}/signup`,
    SIGN_IN = `${URL.AUTH}/signin`,
    USER_INFO = `${URL.AUTH}/user`,
    RESOURCES = `${URL.BASE}/resources`,
    LOGOUT = `${URL.AUTH}/logout`,
    CHATS = `${URL.BASE}/chats`,
    CHATS_USERS = `${URL.CHATS}/users`,
    USERS = `${URL.BASE}/user`,
    CHANGE_PROFILE = `${URL.USERS}/profile`,
    CHANGE_AVATAR = `${URL.CHANGE_PROFILE}/avatar`,
    CHANGE_PASSWORD = `${URL.USERS}/password`,
}

export default URL;
