import { Block } from "../block/block";
import tpl from "./signin.hbs";
import "./signin.scss";

/*export function signin(params: LayoutFunctionParams) {
  return tpl(params);
}*/

export class Signin extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return tpl(this.props);
  }
}
