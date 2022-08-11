import { Button } from "../../components/partials/button/button";
import { Input } from "../../components/partials/input/input";
import { Block } from "../block/block";
import tpl from "./password-change.hbs";

const inputs = [
  new Input({ type: "password", name: "oldPassword", placeholder: "old password" }),
  new Input({ type: "password", name: "newPassport", placeholder: "new password" }),
  new Input({ type: "password", name: "newPassportRepeat", placeholder: "new password one more time" }),
];
export class PasswordChange extends Block {
  constructor(props: Props) {
    super("div", { inputs, button: new Button({ class: "password-change__button card__button", text: "Save" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
