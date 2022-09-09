export class Validator {
  constructor(form: HTMLFormElement) {
    this.form = form;
  }

  form;

  checkInputValidity(element: HTMLInputElement) {
    const errorElement = element.nextElementSibling;
    if (!element.checkValidity()) {
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

  getFormValidity() {
    console.log(this.form);

    const isValid = Array.from(this.form.elements).filter((el) => !this.checkInputValidity(el as HTMLInputElement)).length === 0;
    this.setSubmitButtonState(isValid);
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
