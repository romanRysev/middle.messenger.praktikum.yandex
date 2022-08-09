import tpl from "./main.hbs";
import "./main.scss";
import { router } from "../services/router/router";
import { Block, Props } from "../modules/block/block";

import { Chats } from "../modules/chat/chat";
import { Registration } from "../modules/entry/registration";
import { Signin } from "../modules/entry/signin";
import { PasswordChange } from "../modules/profile/password-change";
import { ProfileEdit } from "../modules/profile/profile-edit";
import { Profile } from "../modules/profile/profile";
import { ErrorTemplate } from "../modules/error/error";
/*function mainLayout(params: LayoutFunctionParams): string {
  return tpl({ content: router.getCurrentRoute().template(params) });
}*/

export class MainLayout extends Block {
  constructor(props: Props) {
    super("div", props);
  }
  render(): string {
    console.log("layout-render");

    const templateName = router.getCurrentRoute().templateName;
    switch (templateName) {
      case "chats":
        return tpl({ content: new Chats(this.props).render(), ...this.props });

      case "registration":
        return tpl({ content: new Registration(this.props).render() });

      case "signin":
        return tpl({ content: new Signin(this.props).render() });

      case "profile":
        return tpl({ content: new Profile(this.props).render() });

      case "profileEdit":
        return tpl({ content: new ProfileEdit(this.props).render() });

      case "passwordChange":
        return tpl({ content: new PasswordChange(this.props).render() });

      case "error":
        return tpl({ content: new ErrorTemplate(this.props).render() });

      default:
        return tpl({ content: new ErrorTemplate(this.props).render() });
    }
  }
}
