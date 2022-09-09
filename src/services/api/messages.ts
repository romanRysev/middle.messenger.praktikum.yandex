import { store } from "../../core/store/store";

export type WsProps = {
  userId: string;
  chatId: string;
  token: string;
};
export class MessagesWSS {
  socket;
  constructor(props: WsProps) {
    this.socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${props.userId}/${props.chatId}/${props.token}`);

    this.socket.addEventListener("open", () => {
      console.log("Соединение установлено");
    });

    this.socket.addEventListener("close", (event) => {
      if (event.wasClean) {
        console.log("Соединение закрыто чисто");
      } else {
        console.log("Обрыв соединения");
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    this.socket.addEventListener("message", (event) => {
      console.log("Получены данные", event.data);
      const messages = store.getState().chatMessages;
      const data = JSON.parse(event.data);

      if (messages[0] && messages[0]?.chat_id === data[0]?.chat_id) {
        if (Array.isArray(data)) {
          messages.unshift(...data);
        } else {
          messages.unshift(data);
        }
        store.set("chatMessages", messages);
      } else {
        store.set("chatMessages", data);
      }
    });

    this.socket.addEventListener("error", (event) => {
      console.error("Ошибка", event);
    });
  }

  getOldMessages(count = 0) {
    if (this.socket.readyState === 1) {
      this.socket.send(
        JSON.stringify({
          content: String(count),
          type: "get old",
        })
      );
    } else {
      setTimeout(() => {
        this.socket.send(
          JSON.stringify({
            content: String(count),
            type: "get old",
          })
        );
      }, 2000);
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
