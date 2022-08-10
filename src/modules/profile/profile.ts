import tpl from "./profile.hbs";
import avatarUrl from "../../../static/Union.svg";
import "./profile.scss";
import backIconUrl from "../../../static/back.svg";
import { Block } from "../block/block";
import { Avatar } from "../../components/partials/avatar/avatar";
import { Button } from "../../components/partials/button/button";

export const profileEventListeners = [
  {
    selector: ".profile__button",
    listener: () => {
      window.location.replace("/signin");
    },
    event: "click",
  },
];

export class Profile extends Block {
  constructor(props: Props) {
    super("div", {
      avatar: new Avatar({ url: avatarUrl, class: "profile__avatar", height: 130, width: 130 }),
      button: new Button({ class: "profile__button", text: "Sign out" }),
      backIconUrl,
      firstName: "Roman",
      email: "roman@gmail.com",
      login: "roman",
      lastName: "Rysev",
      displayName: "ROM",
      phone: "+71237894567",
      ...props,
    });
  }
  render(): string {
    return this.compile(tpl);
  }
}
