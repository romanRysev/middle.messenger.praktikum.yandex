import { Block } from "../../core/block/block";
import tpl from "./link.hbs";
import "./link.scss";

export class Link extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
  componentDidMount() {
    /*if ((this.props as ButtonProps)?.callbacks?.click) {
      this.getContent()?.addEventListener("click", (this.props as ButtonProps).callbacks.click);
    }*/
    return true;
  }
}
