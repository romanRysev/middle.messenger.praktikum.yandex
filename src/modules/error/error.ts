import { Block } from "../block/block";
import tpl from "./error.hbs";
import "./error.scss";

/*export function error(params: LayoutFunctionParams) {
  return tpl(params);
}*/

export class ErrorTemplate extends Block {
  constructor(props: Props = { code: "404", text: "Не туда попали" }) {
    super("div", { ...props });
  }
  render(): string {
    return this.compile(tpl);
  }
}
