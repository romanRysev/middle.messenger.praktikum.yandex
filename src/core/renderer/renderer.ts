import { Block } from "../block/block";

export class Renreder {
  render(layuot: Block, rootQuery: string) {
    const rootElement = document.querySelector(rootQuery);

    if (rootElement) {
      rootElement.appendChild(layuot.getContent());
      layuot.dispatchComponentDidMount();
    } else {
      console.error("Root element not found");
    }
  }
}

export const renderer = new Renreder();
