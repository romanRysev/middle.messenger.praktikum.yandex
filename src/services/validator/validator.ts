export class Validator {
  constructor(form) {
    this.form = form;
  }

  form;

  checkInputValidity(event) {
    const errorElement = event?.target.nextElementSibling;
    if (!this.form.checkValidity()) {
      errorElement.textContent = "Проверьте правильность данных";
      return false;
    }
    errorElement.textContent = "";
    return true;
  }

  setSubmitButtonState(result) {
    const button = this.form.elements.submit;
    if (result) {
      button.classList.remove("button_disabled");
      button.removeAttribute("disabled");
    } else {
      button.classList.add("button_disabled");
      button.setAttribute("disabled", true);
    }
  }
}
