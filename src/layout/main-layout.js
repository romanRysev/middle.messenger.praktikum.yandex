import tpl from "./main.hbs";
import { router } from "../services/router/router";

export function mainLayout() {
  return tpl({ content: router.getCurrentRoute().getTemplate() });
}
