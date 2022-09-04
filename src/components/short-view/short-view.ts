import { Block } from "../../core/block/block";
import { Avatar } from "../avatar/avatar";
import tpl from "./short-view.hbs";
import "./short-view.scss";
import avatarUrl from "../../../static/Union.svg";

type ShortViewProps = { avatar: Block; callbacks?: EventsProp };
export class ShortView extends Block {
  constructor(props: Props) {
    super("div", {
      avatarComponent: new Avatar({
        url: "https://ya-praktikum.tech/api/v2/resources" + props.avatar,
        class: "profile__avatar",
        alt: "avatar",
        height: 64,
        width: 64,
      }),
      ...props,
    });
    console.log(this.props.avatar);
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent()?.addEventListener("click", (this.props as ShortViewProps).callbacks?.click.bind(this));
    return true;
  }
}
