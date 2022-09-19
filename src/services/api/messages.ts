import { store } from "../../core/store/store";

export type WsProps = {
  userId: string;
  chatId: string;
  token: string;
};
export class MessagesWSS {
  socket: WebSocket;
  props;
  constructor(props: WsProps) {
    this.props = props;
    this.init();
  }

  init() {
    this.socket = new WebSocket(
      // eslint-disable-next-line max-len
      `wss://ya-praktikum.tech/ws/chats/${this.props.userId}/${this.props.chatId}/${this.props.token}`
    );

    this.socket.addEventListener("message", (event) => {
      const messages = store.getState().chatMessages.slice();
      const data = JSON.parse(event.data);

      if (Array.isArray(data)) {
        store.set("chatMessages", data);
      } else {
        messages.unshift({ ...data, chat_id: 118, file: null, is_read: false });
        store.set("chatMessages", messages);
      }
    });

    this.socket.addEventListener("error", (event) => {
      console.error("Ошибка", event);
    });
    this.socket.addEventListener("close", () => {
      this.init();
    });
  }

  getOldMessages(count = 0) {
    switch (this.socket.readyState) {
      case 1:
        this.socket.send(
          JSON.stringify({
            content: String(count),
            type: "get old",
          })
        );
        break;

      case 0:
        setTimeout(() => {
          this.socket.send(
            JSON.stringify({
              content: String(count),
              type: "get old",
            })
          );
        }, 1000);
        break;
      case 3:
        this.init();
        setTimeout(() => {
          this.socket.send(
            JSON.stringify({
              content: String(count),
              type: "get old",
            })
          );
        }, 1000);
        break;
    }
  }

  send(content: string) {
    this.socket.send(
      JSON.stringify({
        content,
        type: "message",
      })
    );
  }
}
