import tpl from "./chat.hbs";
import shortView from "./short-view.js";
import "./chat.scss";
import { list, messages } from "./tempData";

export function chat(
  params = {
    list: list,
    messages: messages,
  }
) {
  return tpl(params);
}
