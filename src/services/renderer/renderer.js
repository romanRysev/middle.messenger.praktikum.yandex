import { mainLayout } from "../../layout/main-layout.js";

export class Renreder {
  constructor(rootElement, layuot) {
    this.rootElement = rootElement;
    this.render(layuot);
  }

  render(layuot, params) {
    this.rootElement.innerHTML = layuot(params);
  }
}

export const renderer = new Renreder(
  document.querySelector("#app"),
  mainLayout
);
