import tpl from "./main.hbs";
import "./main.scss";
import { Block, Props } from "../modules/block/block";

export class MainLayout extends Block {
  constructor(props: Props) {
    super("div", props);
  }
  render(): string {
    //console.log("layout-render", this.children);
    return this.compile(tpl);
  }

  /*componentDidUpdate(oldProps, newProps) {
    this.children.content.setProps({ vard: 676676 });
    console.log(this.children.content.props.vard);
    return true;
  }*/
}
