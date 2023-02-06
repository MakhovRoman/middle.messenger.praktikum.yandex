import { HTTPTransport } from 'helpers/HTTPTransport';
import { BaseAPI } from './baseAPI';
import URL from './urls';

class ChatAPI extends BaseAPI {
    getChats() {
        return new HTTPTransport().get(`${URL.CHATS}`, {})
    }

    createChat(title: string) {
        return new HTTPTransport().post(`${URL.CHATS}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                title
            }
        });
    }

    deleteChat(chatId: number) {
        return new HTTPTransport().delete(`${URL.CHATS}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                chatId
            }
        });
    }

    addUsersToChat(chatId: number, userId: number) {
        return new HTTPTransport().put(`${URL.CHATS_USERS}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                chatId,
                users: [
                    userId
                ]
            }
        })
    }

    deleteUsersFromChat(chatId: number, userId: number) {
        return new HTTPTransport().delete(`${URL.CHATS_USERS}`, {
            headers: {
                'content-type': 'application/json'
            },
            data: {
                chatId,
                users: [
                    userId
                ]
            }
        })
    }

    getChatUsers(chatId: number) {
        return new HTTPTransport().get(`${URL.CHATS}/${chatId}/users`, {})
    }

    getTokenChat(chatId: number) {
        return new HTTPTransport().post(`${URL.CHATS}/token/${chatId}`, {})
    }
}

const chatAPI = new ChatAPI();
export default chatAPI;
