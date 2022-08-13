import { Block } from "../../modules/block/block";
import tpl from "./input.hbs";
import "./input.scss";

//export default (params: LayoutFunctionParams) => tpl(params);

export class Input extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): string {
    return this.compile(tpl);
  }

  componentDidMount() {
    const form = document.querySelector(".form");
    if (this.props?.callbacks?.blur) {
      this.getContent()?.addEventListener("focusout", (event) => {
        return this.props.callbacks.blur(event, form);
      });
    }
  }
}
