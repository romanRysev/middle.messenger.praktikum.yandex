import tpl from "./profile-edit.hbs";
import "./profile-edit.scss";
import avatarUrl from "../../../static/Union.svg";
import { Block } from "../block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, nameRegExp, phoneRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";

const inputs = [
  new Input({
    label: "email",
    type: "email",
    name: "email",
    placeholder: "email",
    callbacks: {
      blur: validationOnBlur,
    },
  }),
  new Input({ label: "login", type: "text", name: "login", placeholder: "login", minlength: "3", maxlength: "20", pattern: loginRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "first name", type: "text", name: "first_name", placeholder: "first name", pattern: nameRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "second name", type: "text", name: "second_name", placeholder: "second name", pattern: nameRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "display name", type: "text", name: "display_name", placeholder: "display name", pattern: loginRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "phone", type: "phone", name: "phone", placeholder: "phone", pattern: phoneRegExp, callbacks: { blur: validationOnBlur } }),
];

export class ProfileEdit extends Block {
  constructor(props: Props) {
    super("div", {
      inputs: inputs,
      button: new Button({
        class: "profile-edit__button card__button",
        text: "Save",
        name: "submit",
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            const form = document.forms.namedItem("profile");
            if (form) {
              console.log(getFormData(new FormData(form)));
            }
          },
        },
      }),
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
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
