import Handlebars from "handlebars";
import tpl from "./avatar.hbs";
import "./avatar.scss";
import { modal } from "../modal/modal";
import { avatarChangeModal } from "../modal/avatar-change-modal";

Handlebars.registerPartial("avatar", tpl);

export default (params) => {
  return tpl(params);
};

export const avatarEventListeners = [
  {
    selector: ".avatar",
    listener: () => {
      const popup = document.querySelector(".popup-container");

      popup.innerHTML = modal(avatarChangeModal());
      document
        .querySelector(".modal__close")
        .addEventListener("click", () => (popup.innerHTML = ""));
    },
    event: "click",
  },
];
