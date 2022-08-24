import tpl from "./avatar.hbs";
import "./avatar.scss";
import { Block } from "../../core/block/block";

export default (params: LayoutFunctionParams) => tpl(params);

export class Avatar extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
