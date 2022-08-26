import { Link } from "../../components/link/link";
import { Block } from "../../core/block/block";
import { router } from "../../services/router/router";
import tpl from "./error.hbs";
import "./error.scss";

export class ErrorTemplate extends Block {
  constructor(props: Props = { code: "404", text: "Не туда попали" }) {
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
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
