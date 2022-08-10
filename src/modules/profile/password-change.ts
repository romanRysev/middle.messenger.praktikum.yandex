import { Button } from "../../components/partials/button/button";
import { Block } from "../block/block";
import tpl from "./password-change.hbs";

/*export function passwordChange(params: LayoutFunctionParams) {
  return tpl(params);
}*/
export class PasswordChange extends Block {
  constructor(props: Props) {
    super("div", { button: new Button({ class: "password-change__button card__button", text: "Save" }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
