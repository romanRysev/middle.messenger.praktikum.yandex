import { Block } from "../../core/block/block";
import { ValidationOnBlur } from "../../helpers/helpers";
import tpl from "./input.hbs";
import "./input.scss";

export type InputProps = {
  value: string;
  label?: string;
  type?: string;
  name: string;
  placeholder?: string;
  pattern?: RegExp | string;
  minlength?: string;
  maxlength?: string;
  required?: boolean;
  callbacks?: { blur: ValidationOnBlur };
};

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
        this.getContent()?.addEventListener("focusout", (event) => {
          return (this.props as InputProps).callbacks?.blur(event);
        });
      }
    }
    return true;
  }
}
