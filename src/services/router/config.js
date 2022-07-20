import { chat } from "../../modules/chat/chat";
import { profile } from "../../modules/profile/profile";
import { entry } from "../../modules/entry/entry";
import { notFound } from "../../modules/not-found/not-found";
import { registration } from "../../modules/registration/registration";

export const routes = {
  mainPage: { getTemplate: chat, location: "/" },
  chat: { getTemplate: chat, location: "/chat" },
  profile: { getTemplate: profile, location: "/profile" },
  entry: { getTemplate: entry, location: "/entry" },
  registration: { getTemplate: registration, location: "/registration" },
  notFound: { getTemplate: notFound, location: "/404" },
};
