import tpl from "./profile.hbs";
import avatarUrl from "../../../static/Union.svg";
import "./profile.scss";
import backIconUrl from "../../../static/back.svg";

export function profile(
  params = {
    avatarUrl,
    backIconUrl,
    firstName: "Roman",
    email: "roman@gmail.com",
    login: "roman",
    lastName: "Rysev",
    displayName: "ROM",
    phone: "+71237894567",
  }
) {
  return tpl(params);
}
