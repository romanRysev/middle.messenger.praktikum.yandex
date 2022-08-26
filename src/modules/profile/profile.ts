import tpl from "./profile.hbs";
import avatarUrl from "../../../static/Union.svg";
import "./profile.scss";
import backIconUrl from "../../../static/back.svg";
import { Block } from "../../core/block/block";
import { Avatar } from "../../components/avatar/avatar";
import { Button } from "../../components/button/button";
import { Link } from "../../components/link/link";
import { router } from "../../services/router/router";

export class Profile extends Block {
  constructor(props: Props) {
    super("div", {
      avatar: new Avatar({ url: avatarUrl, class: "profile__avatar", height: 130, width: 130 }),
      button: new Button({
        class: "profile__button",
        text: "Sign out",
        events: {
          click: () => {
            window.location.replace("/signin");
          },
        },
      }),
      passwordLink: new Link({
        text: "Change password",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/change-password");
          },
        },
      }),
      profileEditLink: new Link({
        text: "Edit profile",
        events: {
          click: (event: Event) => {
            event.preventDefault();
            router.go("/edit-profile");
          },
        },
      }),
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
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  public componentDidMount(): boolean {
    document.querySelector(".profile-container__back-link")?.addEventListener("click", () => {
      router.go("/chat");
    });
    return true;
  }
}
