import { Profile } from "../../modules/profile/profile";
import { Signin } from "../../modules/entry/signin";
import { Registration } from "../../modules/entry/registration";
import { ProfileEdit } from "../../modules/profile/profile-edit";
import { PasswordChange } from "../../modules/profile/password-change";
import { chatsModue } from "../../modules/chat/chat";
import { Block } from "../../modules/block/block";

export type Route = {
  templateName: string;
  location: string;
  params?: { content: Block; ["string"]?: unknown };
};

type Routes = Record<string, Route>;

export const routes: Routes = {
  mainPage: {
    templateName: "chats",
    location: "/",
    params: {
      content: chatsModue,
    },
  },
  chat: {
    templateName: "chats",
    location: "/chat",
    params: {
      content: chatsModue,
    },
  },
  profile: {
    templateName: "profile",
    location: "/profile",
    params: { content: new Profile({}) },
  },
  signin: {
    templateName: "signin",
    location: "/signin",
    params: { content: new Signin({}) },
  },
  registration: {
    templateName: "registration",
    location: "/registration",
    params: { content: new Registration({}) },
  },
  profileEdit: {
    templateName: "profileEdit",
    location: "/edit-profile",
    params: { content: new ProfileEdit({}) },
  },
  passwordChange: {
    templateName: "passwordChange",
    location: "/change-password",
    params: { content: new PasswordChange({}) },
  },
};
