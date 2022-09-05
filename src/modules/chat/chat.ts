import { Input } from "../../components/input/input";
import { ShortView } from "../../components/short-view/short-view";
import { Block } from "../../core/block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import { list } from "./tempData";
import sendIconUrl from "../../../static/forward.svg";
import { getFormData } from "../../helpers/helpers";
import { isEqual, router } from "../../services/router/router";
import { Link } from "../../components/link/link";
import { store, StoreEvents } from "../../core/store/store";
import { ChatAPI } from "../../services/api/chat";

async function getChats() {
  return new ChatAPI().getChats();
}

type Messages = {
  text: string;
  time: string;
  isMy: boolean;
}[];

type ListItem = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

type List = ListItem[];

type ChatsProps = {
  shortView: Block[];
  list: List;
  messages: Messages;
  sendIconUrl: "";
  searchInput: Input;
  callbacks: EventsProp;
};

const activeChat: Record<string, ListItem> = { item: list[0] };

const activeShortView = new Proxy(activeChat, {
  set(target, prop, value) {
    if (typeof prop !== "symbol") {
      const activeShortView = chats.find((el) => el.props.current === true);
      activeShortView?.setProps({ current: false });
      target[prop] = value;
      store.set("activeShortView.item", target[prop]);
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
      click: function () {
        const newActiveChat = list.find((item) => {
          return item.id === this.props.id;
        });

        if (newActiveChat) {
          activeShortView.item = JSON.parse(JSON.stringify(newActiveChat));
          this.setProps({ current: true });
        }
      },
    },
  });
});

export class Chats extends Block {
  constructor(props: Props) {
    super("div", {
      shortView: chats,
      list,
      messages: activeShortView.item.messages,
      sendIconUrl: sendIconUrl,
      searchInput: new Input({ type: "text", placeholder: "search" }),
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
            const message = form.elements.namedItem("message");
            activeShortView.item.messages.push({ text: (message as HTMLInputElement)?.value, time: new Date().toUTCString(), isMy: true });
            this.setProps({ messages: activeShortView.item.messages });
          }
        },
      },
      ...props,
    } as ChatsProps);

    store.on(StoreEvents.Updated, () => {
      if (store.getState().activeShortView?.item?.messages && !isEqual(this.props?.messages, store.getState().activeShortView?.item?.messages)) {
        this.setProps({ messages: store.getState().activeShortView.item.messages });
      }
    });
  }

  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent()?.addEventListener("submit", (this.props as ChatsProps)?.callbacks?.submit?.bind(this));
    getChats().then((data) => {
      this.setProps({
        shortView: data.map((chatItem, ind) => {
          return new ShortView({
            ...chatItem,
            current: ind === 0 ? true : false,
            callbacks: {
              click: function () {
                const newActiveChat = list.find((item) => {
                  return item.id === this.props.id;
                });

                if (newActiveChat) {
                  activeShortView.item = JSON.parse(JSON.stringify(newActiveChat));
                  this.setProps({ current: true });
                }
              },
            },
          });
        }),
      });
    });
    return true;
  }
}

export const chatsModue = new Chats({});
