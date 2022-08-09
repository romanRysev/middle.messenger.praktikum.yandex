export class Renreder {
  constructor(rootElement: Element) {
    this.rootElement = rootElement;
  }

  rootElement: Element | null = null;

  render(layuot, params?: LayoutFunctionParams) {
    if (this.rootElement) {
      this.rootElement.innerHTML = layuot.render(params);
      layuot.dispatchComponentDidMount();
    }
  }
}

const rootElement = document.querySelector("#app") ?? document.body.appendChild(document.createElement("div"));

export const renderer = new Renreder(rootElement);
