import { Block } from "../../../core/block/block";
import tpl from "./create-chat-modal.handlebars";

export class CreateChatModal extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  public componentDidMount(): boolean {
    return true;
  }
}
