import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";
import { HOST } from "../../constants/base";

const requester = new HTTPTransport();
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class ChatAPI {
  createChat(title: string) {
    requester.post(`${HOST}chats`, { headers, withCredentials: true, data: { title: title } }).then((data) => {
      if (data.status === 200) {
        console.log(data.response);
        return true;
      }
    });
  }

  getChats() {
    return requester.get(`${HOST}chats`, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        return JSON.parse(data.response);
      }
      return [];
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
