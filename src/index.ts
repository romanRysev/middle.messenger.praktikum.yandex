import "normalize.css";
import "./index.scss";
import { store } from "./core/store/store";
import { Auth } from "./services/api/auth";

import { router } from "./services/router/router";

async function init() {
  const userData = await new Auth().getUserInfo();

  if (userData) {
    store.set("isAuthorized", true);
    store.set("userData", userData);
  } else {
    store.set("isAuthorized", false);
  }
  router.start();
}
init();
