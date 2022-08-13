import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, nameRegExp, passwordRegExp, phoneRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { Block } from "../block/block";
import tpl from "./registration.hbs";
import "./registration.scss";

const inputs = [
  new Input({ label: "first name", type: "text", name: "first_name", placeholder: "first name", pattern: nameRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "second name", type: "text", name: "second_name", placeholder: "second name", pattern: nameRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "login", type: "text", name: "login", placeholder: "login", minlength: "3", maxlength: "20", pattern: loginRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({
    label: "email",
    type: "email",
    name: "email",
    placeholder: "email",
    callbacks: {
      blur: validationOnBlur,
    },
  }),
  new Input({ label: "password", type: "password", name: "password", placeholder: "password", pattern: passwordRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "password one more time", type: "password", name: "passwordRepeat", placeholder: "password one more time", pattern: passwordRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "phone", type: "phone", name: "phone", placeholder: "phone", pattern: phoneRegExp, callbacks: { blur: validationOnBlur } }),
];
export class Registration extends Block {
  constructor(props: Props) {
    super("div", {
      inputs,
      button: new Button({
        class: "registration__button card__button button",
        text: "Registration",
        name: "submit",
        disabled: true,
        callbacks: {
          click: (event) => {
            event.preventDefault();
            const form = document.forms.registration;
            console.log(getFormData(new FormData(form)));
          },
        },
      }),
      ...props,
    });
  }
  render(): string {
    return this.compile(tpl);
  }
}
