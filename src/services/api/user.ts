import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";
import { HOST } from "../../constants/base";

const requester = new HTTPTransport();
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class UserAPI {
  changeProfile(data: Record<string, FormDataEntryValue>) {
    return requester.put(`${HOST}user/profile`, { headers, withCredentials: true, data: data }).then((data) => {
      if (data.status === 200) {
        store.set("userData", JSON.parse(data.response));
        router.go("/profile");
        return true;
      }
    });
  }

  updateAvatar(data: FormData) {
    return requester
      .put(`${HOST}user/profile/avatar`, { headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" }, withCredentials: true, data: data, file: true })
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  updatePassword(data) {
    return requester
      .put(`${HOST}user/password`, { headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" }, withCredentials: true, data: data })
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  getAvatar(path: string) {
    return requester.get(`${HOST}resources${path}`, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        return true;
      }
    });
  }

  findUser(login: string) {
    return requester.post(`${HOST}user/search`, { headers, withCredentials: true, data: { login } }).then((data) => {
      if (data.status === 200) {
        return data.response;
      }
    });
  }
}
