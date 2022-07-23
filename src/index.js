// Стили
import "normalize.css";
import "./static/index.scss";

// Компоненты в виде partial.
import button from "./components/button";
import input from "./components/input";

// Слои
import { mainLayout } from "./layout/main-layout";

// Сервисы
import { renderer } from "./services/renderer/renderer";
import { router } from "./services/router/router";

renderer.render(mainLayout, router.currentRoute.params);

if (router.getCurrentRoute().eventListeners?.length > 0) {
  router
    .getCurrentRoute()
    .eventListeners.forEach((item) =>
      document
        .querySelector(item.selector)
        .addEventListener(item.event, item.listener)
    );
}
