import tpl from "./modal.hbs";
import "./modal.scss";

export function modal(content) {
  return tpl({ content });
}
