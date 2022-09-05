import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";

const requester = new HTTPTransport();
const host = "https://ya-praktikum.tech/api/v2";
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class ChatAPI {
  createChat(title: string) {
    return requester.post(`${host}/chats`, { headers, withCredentials: true, data: { title: title } }).then((data: XMLHttpRequest) => {
      if (data.status === 200) {
        console.log(data.response);
        return true;
      }
    });
  }

  getChats() {
    return requester.get(`${host}/chats`, { headers, withCredentials: true }).then((data: XMLHttpRequest) => {
      if (data.status === 200) {
        return data.response;
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
    return requester.get(url, { headers, withCredentials: true }).then((data: XMLHttpRequest) => {
      if (data.status === 200) {
        console.log(data.response);
        return true;
      }
    });
  }
}
