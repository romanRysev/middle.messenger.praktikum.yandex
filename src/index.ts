// Стили
import "normalize.css";
import "./index.scss";

// Слои
import { MainLayout } from "./layout/main-layout";
//import { Signin } from "./modules/entry/signin";

// Сервисы
import { renderer } from "./services/renderer/renderer";
import { router } from "./services/router/router";

const layout = new MainLayout({
  ...router.currentRoute?.params,
});

renderer.render(layout, { ...router.currentRoute?.params });
