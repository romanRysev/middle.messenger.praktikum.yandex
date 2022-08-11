import tpl from "./profile-edit.hbs";
import "./profile-edit.scss";
import avatarUrl from "../../../static/Union.svg";
import { Block } from "../block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";

const inputs = [
  new Input({ type: "email", name: "email", placeholder: "email" }),
  new Input({ type: "text", name: "login", placeholder: "login" }),
  new Input({ type: "text", name: "first_name", placeholder: "first name" }),
  new Input({ type: "text", name: "second_name", placeholder: "second name" }),
  new Input({ type: "text", name: "display_name", placeholder: "display name" }),
  new Input({ type: "phone", name: "phone", placeholder: "phone" }),
];

export class ProfileEdit extends Block {
  constructor(props: Props) {
    super("div", {
      inputs: inputs,
      button: new Button({ class: "profile-edit__button card__button", text: "Save" }),
      avatarUrl,
      firstName: "Roman",
      email: "roman@gmail.com",
      login: "roman",
      lastName: "Rysev",
      displayName: "ROM",
      phone: "+71237894567",
      ...props,
    });
  }
  render(): string {
    return this.compile(tpl);
  }
}
