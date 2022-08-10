import tpl from "./profile-edit.hbs";
import "./profile-edit.scss";
import avatarUrl from "../../../static/Union.svg";
import { Block } from "../block/block";
import { Button } from "../../components/partials/button/button";

/*export function profileEdit(
  params = {
    avatarUrl,
    firstName: 'Roman',
    email: 'roman@gmail.com',
    login: 'roman',
    lastName: 'Rysev',
    displayName: 'ROM',
    phone: '+71237894567',
  },
) {
  return tpl(params);
}*/

export class ProfileEdit extends Block {
  constructor(props: Props) {
    super("div", { button: new Button({ class: "profile-edit__button card__button", text: "Save" }), avatarUrl, firstName: "Roman", email: "roman@gmail.com", login: "roman", lastName: "Rysev", displayName: "ROM", phone: "+71237894567", ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
