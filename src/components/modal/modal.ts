import { Block } from "../../core/block/block";
import tpl from "./modal.hbs";
import "./modal.scss";

export class Modal extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  public componentDidMount(): boolean {
    document.querySelector(".modal__close")?.addEventListener("click", (event) => {
      event.preventDefault();
      this.element.remove();
    });
    return true;
  }
}
