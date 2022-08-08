import tpl from "./short-view.hbs";
import "./short-view.scss";

export function shortView(
  params = {
    userName: "test2",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 3,
    avatarUrl: "",
  }
) {
  return tpl(params);
}
