export class Renreder {
  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  rootElement: Element | null = null;

  render(layuot, params?: LayoutFunctionParams) {
    if (this.rootElement) {
      layuot.render(params);
      this.rootElement.appendChild(layuot.getContent());
      layuot.dispatchComponentDidMount();
    }
  }
}

const rootElement = document.querySelector("#app") ?? document.body.appendChild(document.createElement("div"));

export const renderer = new Renreder(rootElement);
