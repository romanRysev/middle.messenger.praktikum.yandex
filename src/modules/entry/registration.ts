import { Block } from "../block/block";
import tpl from "./registration.hbs";
import "./registration.scss";

/*export function registration(params: LayoutFunctionParams) {
  return tpl(params);
}*/

export class Registration extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return tpl(this.props);
  }
}
