import { Block } from "../../core/block/block";
import { Avatar } from "../avatar/avatar";
import tpl from "./short-view.hbs";
import "./short-view.scss";
import avatarUrl from "../../../static/Union.svg";
import { HOST } from "../../constants/base";
import { store, StoreEvents } from "../../core/store/store";

function getAvatarUrl(avatar: string | null) {
  if (!avatar) return avatarUrl;

  return `${HOST}resources/` + (avatar && avatar[0] === "/") ? avatar?.slice(1) : avatar;
}

type ShortViewProps = { avatar: Block; callbacks?: EventsProp };
export class ShortView extends Block {
  constructor(props: Props) {
    super("div", {
      avatarComponent: new Avatar({
        url: getAvatarUrl(props.avatar),
        class: "profile__avatar",
        alt: "avatar",
        height: 64,
        width: 64,
      }),
      ...props,
    });

    store.on(StoreEvents.Updated, () => {
      if (store.getState().activeChat !== this.props.id) {
        this.setProps({ current: false });
      }
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent().addEventListener("click", () => {
      store.set("activeChat", this.props.id);
      this.setProps({ current: true });
    });

    return true;
  }
}
