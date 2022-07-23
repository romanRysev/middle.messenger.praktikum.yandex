import tpl from "./profile.hbs";
import avatarUrl from "../../static/Union.svg";
import { modal } from "../../components/modal/modal";
import { avatarChangeModal } from "./avatar-change-modal";

export function profile(
  data = {
    avatarUrl,
    firstName: "Roman",
    email: "roman@gmail.com",
    login: "roman",
    lastName: "Rysev",
    displayName: "ROM",
    phone: "+71237894567",
  }
) {
  return tpl(data);
}

export const profileEventListeners = [
  {
    selector: ".profile__avatar",
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
