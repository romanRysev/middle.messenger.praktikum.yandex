import { Block, Props } from "../block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import { list, messages } from "./tempData";
export class Chats extends Block {
  constructor(props: Props) {
    super("div", { list, messages, ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
