import { chat } from "../../modules/chat/chat";
import { profile } from "../../modules/profile/profile";
import { entry } from "../../modules/entry/entry";
import { notFound } from "../../modules/not-found/not-found";

export const routes = {
  mainPage: { getTemplate: chat, location: "/" },
  chat: { getTemplate: chat, location: "/chat" },
  profile: { getTemplate: profile, location: "/profile" },
  entry: { getTemplate: entry, location: "/entry" },
  notFound: { getTemplate: notFound, location: "/404" },
};
