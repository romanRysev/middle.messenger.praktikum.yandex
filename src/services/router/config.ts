import { profile, profileEventListeners } from "../../modules/profile/profile";
import { signin } from "../../modules/entry/signin";
import { registration } from "../../modules/entry/registration";
import { profileEdit } from "../../modules/profile/profile-edit";
import { error } from "../../modules/error/error";
import { passwordChange } from "../../modules/profile/password-change";
import { avatarEventListeners } from "../../components/partials/avatar/avatar";

export const routes: Routes = {
  mainPage: { templateName: "chats", location: "/" },
  chat: { templateName: "chats", location: "/chat" },
  profile: {
    templateName: "profile",
    eventListeners: [...avatarEventListeners, ...profileEventListeners],
    location: "/profile",
  },
  signin: {
    templateName: "signin",
    location: "/signin",
  },
  registration: {
    templateName: "registration",
    location: "/registration",
  },
  error: {
    templateName: "error",
    location: "/error",
    params: { code: "404", text: "Не туда попали" },
  },
  profileEdit: {
    templateName: "profileEdit",
    eventListeners: avatarEventListeners,
    location: "/edit-profile",
  },
  passwordChange: {
    templateName: "passwordChange",
    location: "/change-password",
  },
};
