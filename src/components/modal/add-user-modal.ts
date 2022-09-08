import { Block } from "../../core/block/block";
import tpl from "./add-user-modal.hbs";
//import "./create-chat-modal.scss";

export class AddUserModal extends Block {
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
