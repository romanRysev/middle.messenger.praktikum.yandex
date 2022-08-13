import tpl from "./main.hbs";
import "./main.scss";
import { Block, Props } from "../modules/block/block";

export class MainLayout extends Block {
  constructor(props: Props) {
    super("div", props);
  }
  render(): string {
    return this.compile(tpl);
  }
}
