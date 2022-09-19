import { Block } from "../../core/block/block";
import tpl from "./link.handlebars";
import "./link.scss";

export class Link extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
