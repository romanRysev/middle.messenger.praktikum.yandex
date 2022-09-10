import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";
import { HOST } from "../../constants/base";
import { UserDataSendable } from "./user";

const requester = new HTTPTransport();
const host = `${HOST}auth`;
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export type SigninProps = { login: string; password: string };

export class Auth {
  signup(data: UserDataSendable) {
    return requester
      .post(`${host}/signup`, { headers, withCredentials: true, data: data })
      .then((data) => {
        if (data.status === 200) {
          router.go("/");
        }
      });
  }
  signin(data: SigninProps) {
    return requester
      .post(`${host}/signin`, { headers, withCredentials: true, data: data })
      .then((data) => {
        if (data.status === 200) {
          this.getUserInfo()
            .then((data) => store.set("userData", data))
            .then(() => {
              store.set("isAuthorized", true);
              router.go("/");
            });
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
