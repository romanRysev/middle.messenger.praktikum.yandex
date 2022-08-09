import tpl from "./profile.hbs";
import avatarUrl from "../../../static/Union.svg";
import "./profile.scss";
import backIconUrl from "../../../static/back.svg";
import { Block } from "../block/block";

/*export function profile(
  params = {
    avatarUrl,
    backIconUrl,
    firstName: 'Roman',
    email: 'roman@gmail.com',
    login: 'roman',
    lastName: 'Rysev',
    displayName: 'ROM',
    phone: '+71237894567',
  },
) {
  return tpl(params);
}*/

export const profileEventListeners = [
  {
    selector: ".profile__button",
    listener: () => {
      window.location.replace("/signin");
    },
    event: "click",
  },
];

export class Profile extends Block {
  constructor(props: Props) {
    super("div", { avatarUrl, backIconUrl, firstName: "Roman", email: "roman@gmail.com", login: "roman", lastName: "Rysev", displayName: "ROM", phone: "+71237894567", ...props });
  }
  render(): string {
    return tpl(this.props);
  }
}
