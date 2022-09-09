import { Block } from "../../../core/block/block";
import { store } from "../../../core/store/store";
import { UserAPI } from "../../../services/api/user";
import { Button } from "../../button/button";
import { Input } from "../../input/input";
import tpl from "./avatar-change-modal.hbs";

export class AvatarChangeModal extends Block {
  constructor(props: Props) {
    super("div", {
      avatarInput: new Input({ name: "avatar", type: "file", placeholder: "avatar", required: true, value: store.getState().userData.avatar ?? "" }),
      saveButton: new Button({
        text: "Save",
        events: {
          click: (event: SubmitEvent) => {
            event.preventDefault();

            if (this.element) {
              const form = document.forms.namedItem("avatar-change");
              const files = (form?.elements?.namedItem("avatar") as HTMLInputElement)?.files;
              if (!files) return;

              const formData = new FormData();
              formData.append("avatar", files[0]);
              new UserAPI().updateAvatar(formData);
              (document.querySelector(".modal__close") as HTMLButtonElement)?.click();
            }
          },
        },
      }),
      ...props,
    });
  }
  render(): ChildNode | null {
    return this.compile(tpl);
  }
}
