import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, passwordRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { Block } from "../block/block";
import tpl from "./signin.hbs";
import "./signin.scss";

const inputs = [
  new Input({ label: "login", type: "text", name: "login", placeholder: "login", minlength: "3", maxlength: "20", pattern: loginRegExp, callbacks: { blur: validationOnBlur } }),
  new Input({ label: "password", type: "password", name: "password", placeholder: "password", pattern: passwordRegExp, callbacks: { blur: validationOnBlur } }),
];

export class Signin extends Block {
  constructor(props: Props) {
    super("div", {
      inputs,
      button: new Button({
        class: "signin__button card__button button_disabled",
        text: "Sign in",
        name: "submit",
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            const form = document.forms.namedItem("signin");
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
