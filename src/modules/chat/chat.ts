import { ShortView } from "../../components/short-view/short-view";
import { Block, Props } from "../block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import { list } from "./tempData";

let currentItem = { item: list[0] };

let currentItemProxy = new Proxy(currentItem, {
  set(target, prop, value) {
    if (typeof prop !== "symbol") {
      const res = chats.find((el) => el.props.current === true);
      res.setProps({ current: false });
      target[prop] = value;
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
        currentItemProxy.item = list.find((item) => {
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
      messages: currentItem.messages,
      ...props,
    });
  }

  render(): string {
    return this.compile(tpl);
  }
}
