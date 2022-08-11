import { Block } from "../../../modules/block/block";
import tpl from "./input.hbs";
import "./input.scss";

//export default (params: LayoutFunctionParams) => tpl(params);

export class Input extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
