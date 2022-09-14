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
  async changeProfile(data: UserDataSendable) {
    try {
      const result = await requester.put(`${HOST}user/profile`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: data,
      });

      if (result.status === 200) {
        store.set("userData", JSON.parse(result.response));
        router.go("/profile");
        return true;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updateAvatar(data: FormData) {
    try {
      const result = await requester.put(`${HOST}user/profile/avatar`, {
        headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" },
        withCredentials: true,
        data: data,
        file: true,
      });

      if (result.status === 200) {
        return true;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async updatePassword(data: { oldPassword: string; newPassword: string }) {
    try {
      const result = await requester.put(`${HOST}user/password`, {
        headers: { "Access-Control-Allow-Credentials": "true", enctype: "multipart/form-data" },
        withCredentials: true,
        data: data,
      });

      if (result.status === 200) {
        return true;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async getAvatar(path: string) {
    try {
      const result = await requester.get(`${HOST}resources${path}`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
      });

      if (result.status === 200) {
        return true;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async findUser(login: string) {
    try {
      const result = await requester.post(`${HOST}user/search`, {
        headers: DEFAULT_HEADERS,
        withCredentials: true,
        data: { login },
      });

      if (result.status === 200) {
        return result.response;
      } else throw `Error: ${result.status}`;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
