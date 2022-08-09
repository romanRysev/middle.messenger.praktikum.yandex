// Стили
import "normalize.css";
import "./index.scss";

// Слои
import { MainLayout } from "./layout/main-layout";

// Сервисы
import { renderer } from "./services/renderer/renderer";
import { router } from "./services/router/router";

const layout = new MainLayout({});

renderer.render(layout, router.currentRoute?.params);
