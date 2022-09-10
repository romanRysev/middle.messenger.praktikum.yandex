import { HTTPTransport } from "../../core/api/requester";
import { HOST } from "../../constants/base";

const requester = new HTTPTransport();
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export type ChatsData = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
}[];
export class ChatAPI {
  createChat(title: string) {
    requester
      .post(`${HOST}chats`, { headers, withCredentials: true, data: { title: title } })
      .then((data) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  getChats(): Promise<ChatsData> {
    return requester.get(`${HOST}chats`, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        return JSON.parse(data.response);
      }
      return [];
    });
  }

  getToken(id: number) {
    return requester
      .post(`${HOST}chats/token/${String(id)}`, { headers, withCredentials: true })
      .then((data) => JSON.parse(data.response))
      .then((data) => {
        return data.token;
      });
  }

  addUsersToChat(users: number[], chatId: number) {
    return requester
      .put(`${HOST}chats/users`, { headers, withCredentials: true, data: { users, chatId } })
      .then((data) => {
        if (data.status === 200) {
          return true;
        }
        return false;
      });
  }

  removeUsersFromChat(users: number[], chatId: number) {
    return requester
      .delete(`${HOST}chats/users`, { headers, withCredentials: true, data: { users, chatId } })
      .then((data) => {
        if (data.status === 200) {
          return true;
        }
        return false;
      });
  }

  /*
   * Понимаю, что проверка существования картинки по средствам ее запроса - такая себе идея...
   * Изначально была идея отправлять OPTIONS для проверки наличия ресурса, но OPTIONS запрещен на сервере(
   * Лучше ничего не придумал...
   */
  isExists(url: string) {
    return requester.get(url, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        return true;
      }
    });
  }
}
