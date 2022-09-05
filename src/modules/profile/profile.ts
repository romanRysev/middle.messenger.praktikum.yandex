import tpl from "./profile.hbs";
import avatarUrl from "../../../static/Union.svg";
import "./profile.scss";
import backIconUrl from "../../../static/back.svg";
import { Block } from "../../core/block/block";
import { Avatar } from "../../components/avatar/avatar";
import { Button } from "../../components/button/button";
import { Link } from "../../components/link/link";
import { router } from "../../index";
import { Auth } from "../../services/api/auth";
import { store, StoreEvents } from "../../core/store/store";
import { Modal } from "../../components/modal/modal";
import { AvatarChangeModal } from "../../components/modal/avatar-change-modal";
import { renderer } from "../../services/renderer/renderer";

export class Profile extends Block {
  constructor(props: Props) {
    super("div", {
      avatar: new Avatar({
        url: store.getState().userData.avatar ? "https://ya-praktikum.tech/api/v2/resources" + store.getState().userData.avatar : avatarUrl,
        class: "profile__avatar",
        height: 130,
        width: 130,
        events: {
          click: () => {
            console.log(12);

            renderer.render(new Modal({ content: new AvatarChangeModal({}) }), ".popup-container");
          },
        },
      }),
      button: new Button({
        class: "profile__button",
        text: "Sign out",
        events: {
          click: () => {
            new Auth().signout().then(() => router.go("/signin"));
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
      firstName: store.getState().userData.first_name,
      email: store.getState().userData.email,
      login: store.getState().userData.login,
      lastName: store.getState().userData.second_name,
      displayName: store.getState().userData.display_name,
      phone: store.getState().userData.phone,
      ...props,
    });

    store.on(StoreEvents.Updated, () => {
      if (store.getState().userData) {
        this.setProps({
          firstName: store.getState().userData.first_name,
          email: store.getState().userData.email,
          login: store.getState().userData.login,
          lastName: store.getState().userData.second_name,
          displayName: store.getState().userData.display_name,
          phone: store.getState().userData.phone,
        });
      }
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }

  public componentDidMount(): boolean {
    document.querySelector(".profile-container__back-link")?.addEventListener("click", (event) => {
      event.preventDefault();
      router.go("/chat");
    });
    return true;
  }
}
