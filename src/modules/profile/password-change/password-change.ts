import { Button } from "../../../components/button/button";
import { Input } from "../../../components/input/input";
import { passwordRegExp } from "../../../constants/regexps";
import { getFormData, validationOnBlur } from "../../../helpers/helpers";
import { Block } from "../../../core/block/block";
import tpl from "./password-change.hbs";
import { UserAPI } from "../../../services/api/user";

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
              new UserAPI().updatePassword({ newPassword: getFormData(new FormData(form)).newPassport as string, oldPassword: getFormData(new FormData(form)).oldPassword as string });
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
