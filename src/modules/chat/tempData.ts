import avatarUrl from "../../../static/Union.svg";

export const list = [
  {
    chatId: 1,
    userName: "test",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 326,
    avatarUrl,
    messages: [
      { text: "Lorem ipsum1", time: "12:00", isMy: true },
      { text: "Lorem ipsum!1", time: "12:10", isMy: false },
    ],
  },
  {
    chatId: 2,
    userName: "test1",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 0,
    avatarUrl,
    messages: [
      { text: "Lorem ipsum2", time: "12:00", isMy: true },
      { text: "Lorem ipsum!2", time: "12:10", isMy: false },
    ],
  },
  {
    chatId: 3,
    userName: "test2",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 0,
    avatarUrl,
    messages: [
      { text: "Lorem ipsum3", time: "12:00", isMy: true },
      { text: "Lorem ipsum!3", time: "12:10", isMy: false },
    ],
  },
  {
    chatId: 4,
    userName: "test3",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 3,
    avatarUrl,
    messages: [
      { text: "Lorem ipsum4", time: "12:00", isMy: true },
      { text: "Lorem ipsum!4", time: "12:10", isMy: false },
    ],
  },
  {
    chatId: 5,
    userName: "test",
    shortText: "Lorem ipsum",
    lastMessageTime: "3 p.m.",
    unreadNumber: 0,
    avatarUrl,
    messages: [
      { text: "Lorem ipsum5", time: "12:00", isMy: true },
      { text: "Lorem ipsum!5", time: "12:10", isMy: false },
    ],
  },
];
