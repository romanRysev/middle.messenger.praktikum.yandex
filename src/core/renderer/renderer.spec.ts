import { expect } from "expect";
import { Block } from "../block/block";
import { renderer } from "./renderer";
require("jsdom-global")('<div id="app"></div>', { url: "http://localhost" });

class EmptyLayout extends Block {
  constructor() {
    super("div", {});
  }
  render(): ChildNode | null {
    return this.compile(() => '<div class="test"></div>');
  }
}

describe("Testing renderer", () => {
  it("DOM must contains element with '.test' class", () => {
    renderer.render(new EmptyLayout(), "#app");
    expect(document.querySelector(".test")).not.toBe(null);
  });
});
