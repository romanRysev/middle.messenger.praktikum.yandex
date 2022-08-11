import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { Block } from "../block/block";
import tpl from "./signin.hbs";
import "./signin.scss";

const inputs = [new Input({ type: "text", name: "login", placeholder: "login" }), new Input({ type: "password", name: "password", placeholder: "password" })];

export class Signin extends Block {
  constructor(props: Props) {
    super("div", { inputs, button: new Button({ class: "signin__button card__button", text: "Sign in" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
