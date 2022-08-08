import { chat } from "../../modules/chat/chat";
import { profile, profileEventListeners } from "../../modules/profile/profile";
import { signin } from "../../modules/entry/signin";
import { registration } from "../../modules/entry/registration";
import { profileEdit } from "../../modules/profile/profile-edit";
import { error } from "../../modules/error/error";
import { passwordChange } from "../../modules/profile/password-change";
import { avatarEventListeners } from "../../components/partials/avatar/avatar";

export const routes: Routes = {
  mainPage: { template: chat, location: "/" },
  chat: { template: chat, location: "/chat" },
  profile: {
    template: profile,
    eventListeners: [...avatarEventListeners, ...profileEventListeners],
    location: "/profile",
  },
  signin: {
    template: (() => signin)(),
    location: "/signin",
  },
  registration: {
    template: registration,
    location: "/registration",
  },
  error: {
    template: error,
    location: "/error",
    params: { code: "404", text: "Не туда попали" },
  },
  profileEdit: {
    template: profileEdit,
    eventListeners: avatarEventListeners,
    location: "/edit-profile",
  },
  passwordChange: {
    template: passwordChange,
    location: "/change-password",
  },
};
