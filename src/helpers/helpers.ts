import { Validator } from "../services/Validator/validator";

export const validationOnBlur = (event, form) => {
  const v = new Validator(form);
  v.setSubmitButtonState(v.checkInputValidity(event));
};
