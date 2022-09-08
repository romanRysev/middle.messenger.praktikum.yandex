import { store } from "../../core/store/store";

export class MessagesWSS {
  socket;
  constructor(props) {
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
      if (Array.isArray(JSON.parse(event.data))) {
        messages.unshift(...JSON.parse(event.data));
      } else {
        messages.unshift(JSON.parse(event.data));
      }
      store.set("chatMessages", messages);
    });

    this.socket.addEventListener("error", (event) => {
      console.log("Ошибка", event.message);
    });
  }

  getOldMessages(count = 0) {
    this.socket.send(
      JSON.stringify({
        content: String(count),
        type: "get old",
      })
    );
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
