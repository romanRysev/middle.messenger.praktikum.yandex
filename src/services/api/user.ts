import { store } from "../../core/store/store";
import { router } from "../router/router";
import { HTTPTransport } from "./requester";

const requester = new HTTPTransport();
const host = "https://ya-praktikum.tech/api/v2/user";
const headers = { "Access-Control-Allow-Credentials": "true", "content-type": "application/json" };

export class User {
  changeProfile(data: Record<string, FormDataEntryValue>) {
    return requester.put(`${host}/profile`, { headers, withCredentials: true, data: data }).then((data) => {
      if (data.status === 200) {
        store.set("userData", JSON.parse(data.response));
        router.go("/profile");
        return true;
      }
    });
  }
}
