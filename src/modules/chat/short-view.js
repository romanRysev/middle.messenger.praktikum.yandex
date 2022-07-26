import Handlebars from "handlebars";
import "./short-view.scss";
import tpl from "./short-view.hbs";

Handlebars.registerPartial("short-view", tpl);

export function shortView(
  params = {
    userName: "test2",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 3,
    avatarUrl,
  }
) {
  console.log(params);
  return tpl(params);
}
