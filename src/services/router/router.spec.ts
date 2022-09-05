import { expect } from "expect";
import { Block } from "../../core/block/block";

require("jsdom-global")('<div id="app"></div>', { url: "http://localhost" });

class EmptyLayout extends Block {
  constructor() {
    super("div", {});
  }
  render(): ChildNode | null {
    const el = document.createElement("div");
    el.classList.add("test-el");
    return el;
  }
}
const routerModule = require("../router/router");
const router = new routerModule.Router();
router.use("/signin", EmptyLayout, "div", { content: "signin" });
router.use("/signup", EmptyLayout, "div", { content: "signup" });
router.use("/signin1", EmptyLayout, "div", { content: "signin1" });

describe("Testing Router", () => {
  it("Every router.go() must add a record to the window.history", () => {
    router.go("/signin");
    router.go("/signup");
    router.go("/signin1");
    expect(window.history.length).toBe(4);
  });
});
