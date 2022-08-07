import { chat } from "../../modules/chat/chat.js";
import {
  profile,
  profileEventListeners,
} from "../../modules/profile/profile.js";
import { signin } from "../../modules/entry/signin.js";
import { registration } from "../../modules/entry/registration.js";
import { profileEdit } from "../../modules/profile/profile-edit.js";
import { error } from "../../modules/error/error.js";
import { passwordChange } from "../../modules/profile/password-change.js";
import { avatarEventListeners } from "../../components/avatar/index.js";

export const routes = {
  mainPage: { template: chat, location: "/" },
  chat: { template: chat, location: "/chat" },
  profile: {
    template: profile,
    eventListeners: [...avatarEventListeners, ...profileEventListeners],
    location: "/profile",
  },
  signin: {
    template: (() => {
      return signin;
    })(),
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
