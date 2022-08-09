import { Block } from "../block/block";
import tpl from "./password-change.hbs";

/*export function passwordChange(params: LayoutFunctionParams) {
  return tpl(params);
}*/
export class PasswordChange extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return tpl(this.props);
  }
}
