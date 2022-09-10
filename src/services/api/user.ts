import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";
import { DEFAULT_HEADERS, HOST } from "../../constants/base";

const requester = new HTTPTransport();

export type UserDataSendable = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};
export class UserAPI {
  changeProfile(data: UserDataSendable) {
    return requester
      .put(`${HOST}user/profile`, { headers: DEFAULT_HEADERS, withCredentials: true, data: data })
      .then((data) => {
        if (data.status === 200) {
          store.set("userData", JSON.parse(data.response));
          router.go("/profile");
          return true;
        }
      });
  }

  updateAvatar(data: FormData) {
    return requester
      .put(`${HOST}user/profile/avatar`, {
        headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" },
        withCredentials: true,
        data: data,
        file: true,
      })
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  updatePassword(data: { oldPassword: string; newPassword: string }) {
    return requester
      .put(`${HOST}user/password`, {
        headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" },
        withCredentials: true,
        data: data,
      })
      .then((data: XMLHttpRequest) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  getAvatar(path: string) {
    return requester
      .get(`${HOST}resources${path}`, { headers: DEFAULT_HEADERS, withCredentials: true })
      .then((data) => {
        if (data.status === 200) {
          return true;
        }
      });
  }

  findUser(login: string) {
    return requester
      .post(`${HOST}user/search`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: { login },
      })
      .then((data) => {
        if (data.status === 200) {
          return data.response;
        }
      });
  }
}
