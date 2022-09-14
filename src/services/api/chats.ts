import { HTTPTransport } from "../../core/api/requester";
import { DEFAULT_HEADERS, HOST } from "../../constants/base";

const requester = new HTTPTransport();

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
  async createChat(title: string) {
    try {
      const result = await requester.post(`${HOST}chats`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: { title: title },
      });

      if (result.status === 200) {
        return true;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getChats(): Promise<ChatsData> {
    try {
      const result = await requester.get(`${HOST}chats`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
      });
      if (result.status === 200) {
        return JSON.parse(result.response);
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  async getToken(id: number) {
    try {
      const result = await requester.post(`${HOST}chats/token/${String(id)}`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
      });
      if (result.status === 200) {
        return JSON.parse(result.response).token;
      } else {
        throw `Error: ${result.status}`;
      }
    } catch (error) {
      console.error(error);
      return "";
    }
  }

  async addUsersToChat(users: number[], chatId: number) {
    try {
      const result = await requester.put(`${HOST}chats/users`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: { users, chatId },
      });

      if (result.status === 200) {
        return true;
      }
      throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async removeUsersFromChat(users: number[], chatId: number) {
    try {
      const result = await requester.delete(`${HOST}chats/users`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: { users, chatId },
      });

      if (result.status === 200) {
        return true;
      }
      throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async isExists(url: string) {
    try {
      const result = await requester.get(url, { headers: DEFAULT_HEADERS, withCredentials: true });
      if (result.status === 200) {
        return true;
      }
      throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
