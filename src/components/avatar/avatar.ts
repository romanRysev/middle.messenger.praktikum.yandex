import tpl from "./avatar.hbs";
import "./avatar.scss";
import { Block } from "../../modules/block/block";

export default (params: LayoutFunctionParams) => tpl(params);

export class Avatar extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
