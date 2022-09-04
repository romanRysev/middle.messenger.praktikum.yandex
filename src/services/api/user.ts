import { store } from "../../core/store/store";
import { router } from "../router/router";
import { HTTPTransport } from "../../core/api/requester";

const requester = new HTTPTransport();
const host = "https://ya-praktikum.tech/api/v2";
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class UserAPI {
  changeProfile(data: Record<string, FormDataEntryValue>) {
    return requester.put(`${host}/user/profile`, { headers, withCredentials: true, data: data }).then((data) => {
      if (data.status === 200) {
        store.set("userData", JSON.parse(data.response));
        router.go("/profile");
        return true;
      }
    });
  }

  updateAvatar(data: FormData) {
    return requester
      .put(`${host}/user/profile/avatar`, { headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" }, withCredentials: true, data: data, file: true })
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  getAvatar(path: string) {
    return requester.get(`${host}/resources${path}`, { headers, withCredentials: true }).then((data: XMLHttpRequest) => {
      if (data.status === 200) {
        console.log(data.response);

        return true;
      }
    });
  }
}
