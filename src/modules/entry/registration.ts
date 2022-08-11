import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Block } from "../block/block";
import tpl from "./registration.hbs";
import "./registration.scss";

const inputs = [
  new Input({ type: "text", name: "first_name", placeholder: "first name" }),
  new Input({ type: "text", name: "second_name", placeholder: "second name" }),
  new Input({ type: "text", name: "login", placeholder: "login" }),
  new Input({ type: "email", name: "email", placeholder: "email" }),
  new Input({ type: "password", name: "password", placeholder: "password" }),
  new Input({ type: "password", name: "passwordRepeat", placeholder: "password one more time" }),
  new Input({ type: "phone", name: "phone", placeholder: "phone" }),
];
export class Registration extends Block {
  constructor(props: Props) {
    super("div", { inputs, button: new Button({ class: "registration__button card__button", text: "Registration" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
