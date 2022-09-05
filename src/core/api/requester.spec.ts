import { expect } from "expect";
import { HOST } from "../../constants/base";
import { HTTPTransport } from "./requester";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("jsdom-global")('<div id="app"></div>', { url: "http://localhost:1234" });
const requester = new HTTPTransport();

describe("Testing requester", () => {
  it("GET to auth/user must returns 401", async () => {
    requester
      .get(`${HOST}auth/user`)
      .then((data) => {
        return data.status;
      })
      .then((status) => expect(status).toEqual(401));
  });
});
