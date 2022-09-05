import "normalize.css";
import "./index.scss";
import { store } from "./core/store/store";
import { Auth } from "./services/api/auth";

import { Router } from "./services/router/router";
import { Chats } from "./modules/chat/chat";
import { Profile } from "./modules/profile/profile";
import { Signin } from "./modules/entry/signin";
import { Registration } from "./modules/entry/registration";
import { ProfileEdit } from "./modules/profile/profile-edit";
import { PasswordChange } from "./modules/profile/password-change";
import { ErrorTemplate } from "./modules/error/error";

const routerModule = new Router("#app");
routerModule
  .use("/chat", Chats)
  .use("/", Chats)
  .use("/profile", Profile)
  .use("/signin", Signin)
  .use("/registration", Registration)
  .use("/edit-profile", ProfileEdit)
  .use("/change-password", PasswordChange)
  .use("/404", ErrorTemplate);

export const router = routerModule;

async function init() {
  try {
    const userData = await new Auth().getUserInfo();
    if (userData) {
      store.set("isAuthorized", true);
      store.set("userData", userData);
    } else {
      store.set("isAuthorized", false);
    }
    router.start();
  } catch (error) {
    console.log(error);
    store.set("isAuthorized", false);
    store.set("userData", {});
    router.start();
  }
}
init();
