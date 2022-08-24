import tpl from "./main.hbs";
import "./main.scss";
import { Block } from "../core/block/block";

export class MainLayout extends Block {
  constructor(props: Props) {
    super("div", props);
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
