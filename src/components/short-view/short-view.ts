import { Block } from "../../modules/block/block";
import { Avatar } from "../avatar/avatar";
import tpl from "./short-view.hbs";
import "./short-view.scss";
import avatarUrl from "../../../static/Union.svg";

export class ShortView extends Block {
  constructor(props: Props) {
    super("div", { avatar: new Avatar({ url: props.avatarUrl ?? avatarUrl, class: "profile__avatar", height: 64, width: 64 }), ...props });
  }
  render(): string {
    return this.compile(tpl);
  }

  componentDidMount() {
    this.getContent()?.addEventListener("click", this.props.callbacks.click.bind(this));
  }
}
