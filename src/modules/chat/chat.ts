import { Input } from "../../components/input/input";
import { ShortView } from "../../components/short-view/short-view";
import { Block } from "../../core/block/block";
import tpl from "./chat.hbs";
import "./chat.scss";
import sendIconUrl from "../../../static/forward.svg";
import { Link } from "../../components/link/link";
import { store, StoreEvents } from "../../core/store/store";
import { ChatAPI, ChatsData } from "../../services/api/chats";
import { Button } from "../../components/button/button";
import { router } from "../..";
import { renderer } from "../../core/renderer/renderer";
import { Modal } from "../../components/modal/modal";
import { CreateChatModal } from "../../components/modal/create-chat-modal/create-chat-modal";
import { AddUserModal } from "../../components/modal/add-user-modal/add-user-modal";
import { MessagesWSS } from "../../services/api/messages";

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
};

const connections: Record<string, Promise<MessagesWSS>> = {};

async function setChats(chats: ChatsData) {
  const res = chats.reduce<ShortView[]>((acc, chatItem) => {
    const connection = new ChatAPI().getToken(chatItem.id).then((token) => {
      return new MessagesWSS({ userId: String(store.getState().userData.id), chatId: String(chatItem.id), token: String(token) });
    });
    connections[chatItem.id] = connection;
    acc.push(
      new ShortView({
        connection: connection,
        ...chatItem,
      })
    );
    return acc;
  }, []);
  return res;
}

function openUserAddingModal() {
  if (store.getState().activeChatId) {
    renderer.render(
      new Modal({
        content: new AddUserModal({
          saveButton: new Button({
            text: "Add",
            name: "add-user",
            events: {
              click: async () => {
                const userId = (document.forms.namedItem("add-user")?.elements.namedItem("login") as HTMLInputElement)?.value;
                await new ChatAPI().addUsersToChat([Number(userId)], store.getState().activeChatId ?? 0);
              },
            },
          }),
          titleInput: new Input({ label: "User ID", name: "login", required: true }),
        }),
      }),
      ".popup-container"
    );
  }
}

export class Chats extends Block {
  constructor(props: Props) {
    super("div", {
      shortView: [],
      messages: [],
      sendIconUrl: sendIconUrl,
      searchInput: new Input({ type: "text", placeholder: "search" }),
      addUserButton: new Button({ text: "Add user to chat", events: { click: openUserAddingModal } }),
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
                        const title = (document.forms.namedItem("create-chat")?.elements.namedItem("title") as HTMLInputElement)?.value;
                        await chatApi.createChat(title);
                        const newChats = await chatApi.getChats();
                        setChats(newChats).then((chats) => {
                          this.setProps({ shortView: chats });
                          if (Array.isArray(this.children.shortView)) {
                            this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
                          } else {
                            this.children.shortView.dispatchComponentDidMount();
                          }
                        });
                        if (Array.isArray(this.children.shortView)) {
                          this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
                        } else {
                          this.children.shortView.dispatchComponentDidMount();
                        }
                        (document.querySelector(".modal__close") as HTMLButtonElement)?.click();
                      },
                    },
                  }),
                  titleInput: new Input({ label: "Chat title", name: "title", required: true }),
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
      events: {
        submit: (event: SubmitEvent) => {
          event.preventDefault();
          const form = document.forms.namedItem("newMessage");

          if (form && store.getState().activeChatId) {
            connections[store.getState().activeChatId ?? 0].then((connection: MessagesWSS) => {
              connection.send((form.elements.namedItem("message") as HTMLInputElement)?.value);
              (form.elements.namedItem("message") as HTMLInputElement).value = "";
            });
          }
        },
      },
      ...props,
    } as ChatsProps);

    /** Обновляем список сообщений, если обновился store */
    store.on(StoreEvents.Updated, () => {
      this.setProps({
        messages: store
          .getState()
          .chatMessages.map((message) => {
            return { ...message, isMy: message.user_id === String(store.getState().userData.id) };
          })
          .reverse(),
      });
      const chatElem = document.querySelector(".chat__right-column");
      chatElem?.scrollTo(0, chatElem.scrollHeight);
    });
  }

  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    getChats().then((data) => {
      store.set("activeChatId", data[0]?.id);
      setChats(data).then((chats) => {
        this.setProps({ shortView: chats });
        if (Array.isArray(this.children.shortView)) {
          this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
        } else {
          this.children.shortView.dispatchComponentDidMount();
        }
        (chats[0].props.connection as Promise<MessagesWSS>).then((data: MessagesWSS) => data.getOldMessages());
      });
    });
    return true;
  }
}

export const chatsModue = new Chats({});
