import { expect } from "expect";
import { Block } from "./block";
require("jsdom-global")('<div id="app"></div>', { url: "http://localhost" });

class EmptyLayout extends Block {
  constructor() {
    super("div", { child: new EmptyChildLayout() });
  }
  render(): ChildNode | null {
    return this.compile(() => '<div class="parent">{{{child}}}</div>');
  }
}

class EmptyChildLayout extends Block {
  constructor() {
    super("div", {});
  }
  render(): ChildNode | null {
    return this.compile(() => '<div class="child"></div>');
  }
}

describe("Testing Block class", () => {
  it("Result element must contains parent & child elements", () => {
    const res = new EmptyLayout().getContent();

    expect(res.querySelector(".parent")).not.toBe(null);
    expect(res.querySelector(".child")).not.toBe(null);
  });
});
