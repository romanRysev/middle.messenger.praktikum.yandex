import tpl from "./profile-edit.hbs";
import "./profile-edit.scss";
import avatarUrl from "../../../static/Union.svg";

export function profileEdit(
  params = {
    avatarUrl,
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
