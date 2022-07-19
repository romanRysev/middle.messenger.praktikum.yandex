import { mainLayout } from "../../layout/main-layout";

export class Renreder {
  constructor(rootElement, layuot) {
    this.rootElement = rootElement;
    this.render(layuot);
  }

  render(layuot) {
    this.rootElement.innerHTML = layuot();
  }
}

export const renderer = new Renreder(
  document.querySelector("#app"),
  mainLayout
);
