import { Block } from "../../core/block/block";

export class Renreder {
  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  rootElement: Element | null = null;

  render(layuot: Block) {
    if (this.rootElement) {
      this.rootElement.appendChild(layuot.getContent());
      layuot.dispatchComponentDidMount();
    }
  }
}

const rootElement = document.querySelector("#app") ?? document.body.appendChild(document.createElement("div"));

export const renderer = new Renreder(rootElement);
