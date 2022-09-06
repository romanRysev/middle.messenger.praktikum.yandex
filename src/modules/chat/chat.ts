import { Input } from "../../components/input/input";
import { ShortView } from "../../components/short-view/short-view";
import { Block } from "../../core/block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import sendIconUrl from "../../../static/forward.svg";
import { getFormData } from "../../helpers/helpers";
import { isEqual } from "../../services/router/router";
import { Link } from "../../components/link/link";
import { store, StoreEvents } from "../../core/store/store";
import { ChatAPI } from "../../services/api/chat";
import { Button } from "../../components/button/button";
import { router } from "../..";
import { renderer } from "../../services/renderer/renderer";
import { Modal } from "../../components/modal/modal";
import { CreateChatModal } from "../../components/modal/create-chat-modal";

async function getChats() {
  return new ChatAPI().getChats();
}

type Messages = {
  text: string;
  time: string;
  isMy: boolean;
}[];

type ChatsProps = {
  shortView?: Block[];
  messages: Messages | null;
  sendIconUrl: "";
  searchInput: Input;
  callbacks: EventsProp;
};

function setChats(chats) {
  return {
    shortView: chats.map((chatItem, ind) => {
      return new ShortView({
        ...chatItem,
      });
    }),
  };
}

export class Chats extends Block {
  constructor(props: Props) {
    super("div", {
      shortView: [],
      messages: [],
      sendIconUrl: sendIconUrl,
      searchInput: new Input({ type: "text", placeholder: "search" }),
      newChatButton: new Button({
        text: "new chat",
        events: {
          click: () => {
            renderer.render(
              new Modal({
                content: new CreateChatModal({
                  saveButton: new Button({
                    text: "Save",
                    name: "save-chat",
                    events: {
                      click: async () => {
                        const chatApi = new ChatAPI();
                        const title = document.forms.namedItem("create-chat")?.elements.namedItem("title").value;
                        await chatApi.createChat(title);
                        const newChats = await chatApi.getChats();
                        this.setProps(setChats(newChats));
                        this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
                        document.querySelector(".modal__close").click();
                      },
                    },
                  }),
                  titleInput: new Input({ label: "Chat title", name: "title" }),
                }),
              }),
              ".popup-container"
            );
          },
        },
      }),
      profileLink: new Link({
        text: "Profile >",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/profile");
          },
        },
      }),
      callbacks: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();

          const form = document.forms.namedItem("newMessage");
          if (form) {
            console.log(getFormData(new FormData(form)));
          }
        },
      },
      ...props,
    } as ChatsProps);

    store.on(StoreEvents.Updated, () => {
      if (store.getState().activeChat) {
        this.setProps({ messages: [] });
      }
    });
  }

  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent()?.addEventListener("submit", (this.props as ChatsProps)?.callbacks?.submit?.bind(this));
    getChats().then((data) => {
      this.setProps(setChats(data));
      this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
    });
    return true;
  }
}

export const chatsModue = new Chats({});
