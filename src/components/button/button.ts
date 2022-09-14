import { Block } from "../../core/block/block";
import tpl from "./button.hbs";
import "./button.scss";

type ButtonProps = { callbacks: Record<string, EventListener>; ["string"]?: unknown };

export class Button extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
  componentDidMount() {
    if ((this.props as ButtonProps)?.callbacks?.click) {
      this.getContent()?.addEventListener("click", (this.props as ButtonProps).callbacks.click);
    }
    return true;
  }
}
