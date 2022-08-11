import { ShortView } from "../../components/short-view/short-view";
import { Block, Props } from "../block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import { list } from "./tempData";

let current = { item: list[0] };

let currentItem = new Proxy(current, {
  set(target, prop, value) {
    if (typeof prop !== "symbol") {
      const res = chats.find((el) => el.props.current === true);
      res.setProps({ current: false });
      target[prop] = value;
      asd();
      return true;
    }
    return false;
  },
});

const chats = list.map((chatItem, ind) => {
  return new ShortView({
    ...chatItem,
    current: ind === 0 ? true : false,
    callbacks: {
      click: function (event) {
        currentItem.item = list.find((item) => {
          return item.chatId === this.props.chatId;
        });
        this.setProps({ current: true });
      },
    },
  });
});

export class Chats extends Block {
  constructor(props: Props) {
    super("div", {
      shortView: chats,
      list,
      messages: currentItem.item.messages,
      ...props,
    });
  }

  render(): string {
    return this.compile(tpl);
  }
}

export const chatsModue = new Chats({});

function asd() {
  chatsModue.setProps({ messages: currentItem.item.messages });
}
