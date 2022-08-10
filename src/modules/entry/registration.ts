import { Button } from "../../components/partials/button/button";
import { Block } from "../block/block";
import tpl from "./registration.hbs";
import "./registration.scss";

/*export function registration(params: LayoutFunctionParams) {
  return tpl(params);
}*/

export class Registration extends Block {
  constructor(props: Props) {
    super("div", { button: new Button({ class: "registration__button card__button", text: "Registration" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
