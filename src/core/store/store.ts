import { set } from "../../helpers/helpers";
import { EventBus } from "../event-bus/event-bus";

export enum StoreEvents {
  Updated = "updated",
}

type State = {
  activeChatId: number | null;
  isAuthorized: boolean;
  userData: UserData;
  chatMessages: ChatMessages;
};

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type ChatMessages = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
}[];

class Store extends EventBus {
  private state: State = {
    activeChatId: null,
    isAuthorized: false,
    userData: { id: -1, first_name: "", second_name: "", display_name: "", login: "", email: "", phone: "", avatar: "" },
    chatMessages: [],
  };

  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }

  public getState() {
    return this.state;
  }
}

export const store = new Store();
