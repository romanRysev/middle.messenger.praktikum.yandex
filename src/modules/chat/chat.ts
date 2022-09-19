import { Input } from "../../components/input/input";
import { ShortView } from "../../components/short-view/short-view";
import { Block } from "../../core/block/block";
import tpl from "./chat.handlebars";
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
import { ChatUserModal } from "../../components/modal/chat-user-modal/chat-user-modal";
import { MessagesWSS } from "../../services/api/messages";

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

const connections: Record<string, MessagesWSS> = {};

function openUserAddingModal() {
  if (store.getState().activeChatId) {
    renderer.render(
      new Modal({
        content: new ChatUserModal({
          saveButton: new Button({
            text: "Add",
            name: "add-user",
            events: {
              click: async () => {
                const userId = (
                  document.forms
                    .namedItem("chat-user")
                    ?.elements.namedItem("id") as HTMLInputElement
                )?.value;
                await new ChatAPI().addUsersToChat(
                  [Number(userId)],
                  store.getState().activeChatId ?? 0
                );
                document.querySelector<HTMLButtonElement>(".modal__close")?.click();
              },
            },
          }),
          titleInput: new Input({ label: "User ID", name: "id", required: true }),
        }),
      }),
      ".popup-container"
    );
  }
}

function openUserDelitingModal() {
  if (store.getState().activeChatId) {
    renderer.render(
      new Modal({
        content: new ChatUserModal({
          saveButton: new Button({
            text: "Remove",
            name: "delete-user",
            events: {
              click: async () => {
                const userId = (
                  document.forms
                    .namedItem("chat-user")
                    ?.elements.namedItem("id") as HTMLInputElement
                )?.value;
                await new ChatAPI().removeUsersFromChat(
                  [Number(userId)],
                  store.getState().activeChatId ?? 0
                );
                document.querySelector<HTMLButtonElement>(".modal__close")?.click();
              },
            },
          }),
          titleInput: new Input({ label: "User ID", name: "id", required: true }),
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
      addUserButton: new Button({
        text: "Add user to chat",
        events: { click: openUserAddingModal },
      }),
      deleteUserButton: new Button({
        text: "Remove user from chat",
        events: { click: openUserDelitingModal },
      }),
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
                        const chatApi = this.chatAPI;
                        const title = (
                          document.forms
                            .namedItem("create-chat")
                            ?.elements.namedItem("title") as HTMLInputElement
                        )?.value;
                        await chatApi.createChat(title);
                        const newChats = await chatApi.getChats();
                        const chats = await this.setChats(newChats);

                        this.setProps({ shortView: chats });
                        if (Array.isArray(this.children.shortView)) {
                          this.children.shortView.forEach((child) =>
                            child.dispatchComponentDidMount()
                          );
                        } else {
                          this.children.shortView.dispatchComponentDidMount();
                        }

                        if (Array.isArray(this.children.shortView)) {
                          this.children.shortView.forEach((child) =>
                            child.dispatchComponentDidMount()
                          );
                        } else {
                          this.children.shortView.dispatchComponentDidMount();
                        }
                        document.querySelector<HTMLButtonElement>(".modal__close")?.click();
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
        submit: async (event: SubmitEvent) => {
          event.preventDefault();
          const form = document.forms.namedItem("newMessage");

          if (form && store.getState().activeChatId) {
            const connection = await connections[store.getState().activeChatId ?? 0];

            connection.send((<HTMLInputElement>form.elements.namedItem("message"))?.value);
            (<HTMLInputElement>form.elements.namedItem("message")).value = "";
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

      const chatElem = document.querySelector("#chat__messages");
      chatElem?.scrollTo(0, chatElem.scrollHeight);
    });

    this.chatAPI = new ChatAPI();
  }

  chatAPI: ChatAPI;

  async setChats(chats: ChatsData) {
    const res = await chats.reduce<Promise<ShortView[]>>(async (acc, chatItem) => {
      const token = await this.chatAPI.getToken(chatItem.id);

      const connection = new MessagesWSS({
        userId: String(store.getState().userData.id),
        chatId: String(chatItem.id),
        token: String(token),
      });

      connections[chatItem.id] = connection;
      const accAwaited = await acc;
      accAwaited.push(
        new ShortView({
          connection: connection,
          ...chatItem,
        })
      );
      return acc;
    }, Promise.resolve([]));
    return res;
  }

  render(): ChildNode | null {
    return this.compile(tpl);
  }

  async componentDidMount() {
    const data = await this.chatAPI.getChats();
    store.set("activeChatId", data[0]?.id);
    const chats = await this.setChats(data);
    this.setProps({ shortView: chats });
    if (Array.isArray(this.children.shortView)) {
      this.children.shortView.forEach((child) => child.dispatchComponentDidMount());
    } else {
      this.children.shortView.dispatchComponentDidMount();
    }
    const connection = await (chats[0].props.connection as Promise<MessagesWSS>);

    connection.getOldMessages();

    return true;
  }
}

export const chatsModue = new Chats({});
