import { Link } from "../../components/link/link";
import { Block } from "../../core/block/block";
import { router } from "../../index";
import tpl from "./error.hbs";
import "./error.scss";

export class ErrorTemplate extends Block {
  constructor(props: Props) {
    super("div", {
      chatsLink: new Link({
        text: "Back to chats",
        class: "not-found__link",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/chat");
          },
        },
      }),
      code: "404",
      text: "Не туда попали",
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
