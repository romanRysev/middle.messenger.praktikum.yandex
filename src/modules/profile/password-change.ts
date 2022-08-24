import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { passwordRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { Block } from "../block/block";
import tpl from "./password-change.hbs";

const inputs = [
  new Input({ label: "old password", type: "password", name: "oldPassword", placeholder: "old password", pattern: passwordRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "new password", type: "password", name: "newPassport", placeholder: "new password", pattern: passwordRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({
    label: "new password one more time",
    type: "password",
    name: "newPassportRepeat",
    placeholder: "new password one more time",
    pattern: passwordRegExp,
    callbacks: { blur: validationOnBlur },
  }),
];
export class PasswordChange extends Block {
  constructor(props: Props) {
    super("div", {
      inputs,
      button: new Button({
        class: "password-change__button card__button button_disabled",
        text: "Save",
        name: "submit",
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            const form = document.forms.namedItem("passwordChange");
            if (form) {
              console.log(getFormData(new FormData(form)));
            }
          },
        },
      }),
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
