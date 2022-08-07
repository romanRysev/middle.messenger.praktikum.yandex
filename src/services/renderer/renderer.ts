import { mainLayout } from '../../layout/main-layout';

export class Renreder {
  constructor(rootElement: Element, layuot: LayoutFunction) {
    this.rootElement = rootElement;
    this.render(layuot);
  }

  rootElement: Element | null = null;

  render(layuot: LayoutFunction, params?: LayoutFunctionParams) {
    if (this.rootElement) {
      this.rootElement.innerHTML = layuot(params);
    }
  }
}

const rootElement = document.querySelector('#app')
  ?? document.body.appendChild(document.createElement('div'));

export const renderer = new Renreder(rootElement, mainLayout);
