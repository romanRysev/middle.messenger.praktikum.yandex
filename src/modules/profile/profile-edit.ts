import tpl from "./profile-edit.hbs";
import "./profile-edit.scss";
import avatarUrl from "../../../static/Union.svg";
import { Block } from "../../core/block/block";
import { Button } from "../../components/button/button";
import { Input } from "../../components/input/input";
import { loginRegExp, nameRegExp, phoneRegExp } from "../../constants/regexps";
import { getFormData, validationOnBlur } from "../../helpers/helpers";
import { UserAPI } from "../../services/api/user";
import { store, StoreEvents } from "../../core/store/store";

const inputs = [
  new Input({
    label: "email",
    value: store.getState()?.userData?.email ?? "",
    type: "email",
    name: "email",
    placeholder: "email",
    callbacks: {
      blur: validationOnBlur,
    },
  }),
  new Input({
    value: store.getState()?.userData?.login ?? "",
    label: "login",
    type: "text",
    name: "login",
    placeholder: "login",
    minlength: "3",
    maxlength: "20",
    pattern: loginRegExp,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({
    value: store.getState()?.userData?.first_name ?? "",
    label: "first name",
    type: "text",
    name: "first_name",
    placeholder: "first name",
    pattern: nameRegExp,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({
    value: store.getState()?.userData?.second_name ?? "",
    label: "second name",
    type: "text",
    name: "second_name",
    placeholder: "second name",
    pattern: nameRegExp,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({
    value: store.getState()?.userData?.display_name ?? "",
    label: "display name",
    type: "text",
    name: "display_name",
    placeholder: "display name",
    pattern: loginRegExp,
    callbacks: { blur: validationOnBlur },
  }),
  new Input({ value: store.getState()?.userData?.phone ?? "", label: "phone", type: "phone", name: "phone", placeholder: "phone", pattern: phoneRegExp, callbacks: { blur: validationOnBlur } }),
];

const updateInput = () => {
  if (store.getState().userData) {
    inputs.forEach((item) => {
      item.setProps({ value: store.getState().userData[item.props.name] });
    });
  }
};

export class ProfileEdit extends Block {
  constructor(props: Props) {
    super("div", {
      inputs: inputs,
      button: new Button({
        class: "profile-edit__button card__button",
        text: "Save",
        name: "submit",
        callbacks: {
          click: (event: Event) => {
            event.preventDefault();
            const form = document.forms.namedItem("profile");
            if (form) {
              new UserAPI().changeProfile(getFormData(new FormData(form)));
            }
          },
        },
      }),
      avatarUrl,
      ...props,
    });

    store.on(StoreEvents.Updated, updateInput);
  }
  render(): ChildNode | null {
    updateInput();
    return this.compile(tpl);
  }
}
