import { store } from "../../core/store/store";
import { router } from "../../index";
import { HTTPTransport } from "../../core/api/requester";
import { DEFAULT_HEADERS, HOST } from "../../constants/base";
import { UserDataSendable } from "./user";

const requester = new HTTPTransport();
const host = `${HOST}auth`;

export type SigninProps = { login: string; password: string };

export class Auth {
  async signup(data: UserDataSendable) {
    try {
      const result = await requester.post(`${host}/signup`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: data,
      });

      if (result.status === 200) {
        router.go("/");
      } else {
        throw `Error: ${result.status}`;
      }
    } catch (error) {
      console.error(error);
    }
  }
  async signin(data: SigninProps) {
    try {
      const result = await requester.post(`${host}/signin`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: data,
      });

      if (result.status === 200) {
        const userInfo = await this.getUserInfo();
        store.set("userData", userInfo);
        store.set("isAuthorized", true);
        router.go("/");
      } else {
        throw `Error: ${result.status}`;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async getUserInfo() {
    try {
      const result = await requester.get(`${host}/user`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
      });
      if (result.status === 200) {
        return JSON.parse(result.response);
      } else {
        throw `Error: ${result.status}`;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async signout() {
    try {
      const result = await requester.post(`${host}/logout`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
      });
      if (result.status === 200) {
        store.set("isAuthorized", false);
      }
      throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
    }
  }
}
