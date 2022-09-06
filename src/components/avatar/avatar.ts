import tpl from "./avatar.hbs";
import "./avatar.scss";
import { Block } from "../../core/block/block";
import avatarUrl from "../../../static/Union.svg";
import { ChatAPI } from "../../services/api/chat";

export class Avatar extends Block {
  constructor(props: Props) {
    super("div", {
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    console.log(this.props.url);
    new ChatAPI().isExists(this.props.url).then((data) => {
      if (!data) {
        this.setProps({ url: avatarUrl });
      }
    });
    return true;
  }
}
