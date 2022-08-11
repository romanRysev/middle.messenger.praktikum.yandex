import { Profile, profileEventListeners } from "../../modules/profile/profile";
import { Signin } from "../../modules/entry/signin";
import { Registration } from "../../modules/entry/registration";
import { ProfileEdit } from "../../modules/profile/profile-edit";
import { ErrorTemplate } from "../../modules/error/error";
import { PasswordChange } from "../../modules/profile/password-change";
import { Chats } from "../../modules/chat/chat";

export const routes: Routes = {
  mainPage: {
    templateName: "chats",
    location: "/",
    params: {
      content: new Chats({}),
    },
  },
  chat: {
    templateName: "chats",
    location: "/chat",
    params: {
      content: new Chats({}),
    },
  },
  profile: {
    templateName: "profile",
    eventListeners: [...profileEventListeners],
    location: "/profile",
    params: { content: new Profile() },
  },
  signin: {
    templateName: "signin",
    location: "/signin",
    params: { content: new Signin() },
  },
  registration: {
    templateName: "registration",
    location: "/registration",
    params: { content: new Registration() },
  },
  error: {
    templateName: "error",
    location: "/error",
    params: { content: new ErrorTemplate() },
  },
  profileEdit: {
    templateName: "profileEdit",
    location: "/edit-profile",
    params: { content: new ProfileEdit() },
  },
  passwordChange: {
    templateName: "passwordChange",
    location: "/change-password",
    params: { content: new PasswordChange() },
  },
};
