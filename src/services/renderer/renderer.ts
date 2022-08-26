import { Block } from "../../core/block/block";

export class Renreder {
  render(layuot: Block, rootQuery: string) {
    const rootElement = document.querySelector(rootQuery) ?? document.body.appendChild(document.createElement("div"));

    if (rootElement) {
      rootElement.appendChild(layuot.getContent());
      layuot.dispatchComponentDidMount();
    }
  }
}

export const renderer = new Renreder();
