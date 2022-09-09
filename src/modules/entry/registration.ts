import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, nameRegExp, passwordRegExp, phoneRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { Block } from "../../core/block/block";
import tpl from "./registration.hbs";
import "./registration.scss";
import { Link } from "../../components/link/link";
import { router } from "../../index";
import { Auth } from "../../services/api/auth";
import { UserDataSendable } from "../../services/api/user";

const inputs = [
  new Input({ label: "first name", type: "text", name: "first_name", placeholder: "first name", pattern: nameRegExp, required: true, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "second name", type: "text", name: "second_name", placeholder: "second name", pattern: nameRegExp, required: true, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "login", type: "text", name: "login", placeholder: "login", minlength: "3", maxlength: "20", pattern: loginRegExp, required: true, callbacks: { blur: validationOnBlur } }),
  new Input({
    label: "email",
    type: "email",
    name: "email",
    placeholder: "email",
    required: true,
    callbacks: {
      blur: validationOnBlur,
    },
  }),
  new Input({ label: "password", type: "password", name: "password", placeholder: "password", pattern: passwordRegExp, required: true, callbacks: { blur: validationOnBlur } }),
  new Input({
    label: "password one more time",
    type: "password",
    name: "passwordRepeat",
    placeholder: "password one more time",
    pattern: passwordRegExp,
    required: true,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({ label: "phone", type: "phone", name: "phone", placeholder: "phone", pattern: phoneRegExp, required: true, callbacks: { blur: validationOnBlur } }),
];
export class Registration extends Block {
  constructor(props: Props) {
    super("div", {
      inputs,
      button: new Button({
        class: "registration__button card__button button",
        text: "Registration",
        name: "submit",
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            if (!this.element.attributes.getNamedItem("disabled")) {
              const form = document.forms.namedItem("registration");
              if (form) {
                new Auth().signup(getFormData(new FormData(form)) as UserDataSendable);
              }
            }
          },
        },
      }),
      signinLink: new Link({
        text: "Sign in",
        class: "registration__link",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/signin");
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
