import { Block } from "../../modules/block/block";
import tpl from "./button.hbs";
import "./button.scss";

//export default (params: LayoutFunctionParams) => tpl(params);

export class Button extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
  componentDidMount() {
    if (this.props?.callbacks?.click) {
      this.getContent()?.addEventListener("click", this.props?.callbacks?.click);
    }
  }
}
