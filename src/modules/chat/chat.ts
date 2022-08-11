import { ShortView } from "../../components/short-view/short-view";
import { Block, Props } from "../block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import { list, messages } from "./tempData";

function getChats() {
  return list.map((chatItem) => {
    return new ShortView({ ...chatItem });
  });
}

export class Chats extends Block {
  constructor(props: Props) {
    super("div", { shortView: getChats(), list, messages, ...props });
  }

  render(): string {
    return this.compile(tpl);
  }
}
