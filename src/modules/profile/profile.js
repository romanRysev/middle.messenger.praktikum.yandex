import tpl from "./profile.hbs";
import avatarUrl from "../../static/Union.svg";

export function profile() {
  return tpl({ avatarUrl });
}
