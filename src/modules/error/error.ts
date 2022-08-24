import { Block } from "../../core/block/block";
import tpl from "./error.hbs";
import "./error.scss";

export class ErrorTemplate extends Block {
  constructor(props: Props = { code: "404", text: "Не туда попали" }) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
