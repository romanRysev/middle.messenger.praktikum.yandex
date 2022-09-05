import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";

const requester = new HTTPTransport();
const host = "https://ya-praktikum.tech/api/v2/auth";
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class Auth {
  signup(data: Record<string, FormDataEntryValue>) {
    return requester.post(`${host}/signup`, { headers, withCredentials: true, data: data }).then((data) => {
      if (data.status === 200) {
        router.go("/signin");
      }
    });
  }
  signin(data: Record<string, FormDataEntryValue>) {
    return requester.post(`${host}/signin`, { headers, withCredentials: true, data: data }).then((data) => {
      if (data.status === 200) {
        this.getUserInfo();
        store.set("isAuthorized", true);
        router.go("/");
      }
    });
  }
  getUserInfo() {
    return requester.get(`${host}/user`, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        return JSON.parse(data.response);
      }
      return null;
    });
  }

  signout() {
    return requester.post(`${host}/logout`, { headers, withCredentials: true }).then((data) => {
      if (data.status === 200) {
        store.set("isAuthorized", false);
      }
    });
  }
}
