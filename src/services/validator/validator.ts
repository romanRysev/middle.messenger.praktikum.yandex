export class Validator {
  constructor(form: HTMLFormElement) {
    this.form = form;
  }

  form;

  checkInputValidity(event: SubmitEvent) {
    const errorElement = (event.target as Element)?.nextElementSibling;

    if (!this.form.checkValidity()) {
      if (errorElement) {
        errorElement.textContent = "Проверьте правильность данных";
      }
      return false;
    }
    if (errorElement) {
      errorElement.textContent = "";
    }

    return true;
  }

  setSubmitButtonState(valid: boolean) {
    const button = this.form.elements.namedItem("submit");
    if (button && button instanceof Element) {
      if (valid) {
        button.classList.remove("button_disabled");
        button.removeAttribute("disabled");
      } else {
        button.classList.add("button_disabled");
        button.setAttribute("disabled", "true");
      }
    }
  }
}
