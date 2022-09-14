import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, passwordRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { Block } from "../../core/block/block";
import tpl from "./signin.hbs";
import "./signin.scss";
import { Link } from "../../components/link/link";
import { router } from "../../index";
import { Auth, SigninProps } from "../../services/api/auth";

const inputs = [
  new Input({
    label: "login",
    type: "text",
    name: "login",
    placeholder: "login",
    minlength: "3",
    maxlength: "20",
    pattern: loginRegExp,
    required: true,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({
    label: "password",
    type: "password",
    name: "password",
    placeholder: "password",
    pattern: passwordRegExp,
    required: true,
    callbacks: { blur: validationOnBlur },
  }),
];

export class Signin extends Block {
  constructor(props: Props) {
    super("div", {
      inputs,
      button: new Button({
        class: "signin__button card__button button_disabled",
        text: "Sign in",
        name: "submit",
        disabled: true,
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            if (!this.element.attributes.getNamedItem("disabled")) {
              const form = document.forms.namedItem("signin");
              if (form) {
                new Auth().signin(getFormData(new FormData(form)) as SigninProps);
              }
            }
          },
        },
      }),
      registrationLink: new Link({
        text: "Registration",
        class: "signin__link",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/registration");
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
