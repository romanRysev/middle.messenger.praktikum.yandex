import "normalize.css";
import "./index.scss";
import { store } from "./core/store/store";
import { Auth } from "./services/api/auth";

import { router } from "./services/router/router";

async function init() {
  const res = await new Auth().getUserInfo();

  if (res) {
    store.set("isAuthorized", true);
  } else {
    store.set("isAuthorized", false);
  }
  router.start();
}
init();
