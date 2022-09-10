import tpl from "./avatar.hbs";
import "./avatar.scss";
import { Block } from "../../core/block/block";
import avatarUrl from "../../../static/Union.svg";
import { ChatAPI } from "../../services/api/chats";

export class Avatar extends Block {
  constructor(props: Props) {
    super("div", {
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  async componentDidMount() {
    console.log(this.props.url);

    const res = await new ChatAPI().isExists(String(this.props.url ?? ""));
    if (!res) {
      this.setProps({ url: avatarUrl });
    }
    return true;
  }
}
