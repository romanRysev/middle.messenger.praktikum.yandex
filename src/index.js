// Стили
import "normalize.css";
import "./index.scss";

// Компоненты в виде partial.
import { button } from "./components/button/index.js";
import { input } from "./components/input/index.js";
import { avatar } from "./components/avatar/index.js";

// Слои
import { mainLayout } from "./layout/main-layout.js";

// Сервисы
import { renderer } from "./services/renderer/renderer.js";
import { router } from "./services/router/router.js";

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
