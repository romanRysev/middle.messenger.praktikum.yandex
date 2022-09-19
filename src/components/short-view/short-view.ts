import { Block } from "../../core/block/block";
import { Avatar } from "../avatar/avatar";
import tpl from "./short-view.handlebars";
import "./short-view.scss";
import avatarUrl from "../../../static/Union.svg";
import { HOST } from "../../constants/base";
import { store, StoreEvents } from "../../core/store/store";
import { MessagesWSS } from "../../services/api/messages";

function getAvatarUrl(avatar: string | null) {
  if (!avatar) return avatarUrl;

  return `${HOST}resources/` + (avatar && avatar[0] === "/") ? avatar?.slice(1) : avatar;
}
export class ShortView extends Block {
  constructor(props: Props) {
    super("div", {
      avatarComponent: new Avatar({
        url: getAvatarUrl(props.avatar as string | null),
        class: "profile__avatar",
        alt: "avatar",
        height: 64,
        width: 64,
      }),
      ...props,
    });

    store.on(StoreEvents.Updated, () => {
      if (store.getState().activeChatId !== this.props.id) {
        this.setProps({ current: false });
      }
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent().addEventListener("click", async () => {
      if (this.props.id !== store.getState().activeChatId) {
        store.set("activeChatId", this.props.id);
        this.setProps({ current: true });
        const res = await (this.props.connection as Promise<MessagesWSS>);
        res.getOldMessages();
      }
    });

    return true;
  }
}
