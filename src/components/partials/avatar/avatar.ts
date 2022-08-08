import tpl from "./avatar.hbs";
import "./avatar.scss";
import { modal } from "../../modal/modal";
import { avatarChangeModal } from "../../modal/avatar-change-modal";

export default (params: LayoutFunctionParams) => tpl(params);

export const avatarEventListeners = [
  {
    selector: ".avatar",
    listener: () => {
      const popup = document.querySelector(".popup-container") ?? document.body.appendChild(document.createElement("div"));

      popup.innerHTML = modal(avatarChangeModal());
      document.querySelector(".modal__close")?.addEventListener("click", () => (popup.innerHTML = ""));
    },
    event: "click",
  },
];
