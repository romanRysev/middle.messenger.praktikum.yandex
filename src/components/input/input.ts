import { Block } from "../../core/block/block";
import tpl from "./input.hbs";
import "./input.scss";

type InputProps = { callbacks?: InputCallbacks };
type InputCallbacks = Record<string, (event: FocusEvent, form: HTMLFormElement) => void>;
export class Input extends Block {
  constructor(props: Props) {
    super("div", { ...props });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  componentDidMount() {
    const form = document.querySelector(".form");
    if (form && form instanceof HTMLFormElement) {
      if ((this.props.callbacks as EventsProp)?.blur) {
        this.getContent()?.addEventListener("focusout", () => {
          return (this.props as InputProps).callbacks?.blur(form);
        });
      }
    }
    return true;
  }
}
