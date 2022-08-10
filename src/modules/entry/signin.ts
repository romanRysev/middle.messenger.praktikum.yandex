import { Button } from "../../components/partials/button/button";
import { Block } from "../block/block";
import tpl from "./signin.hbs";
import "./signin.scss";

/*export function signin(params: LayoutFunctionParams) {
  return tpl(params);
}*/

export class Signin extends Block {
  constructor(props: Props) {
    super("div", { button: new Button({ class: "signin__button card__button", text: "Sign in" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
