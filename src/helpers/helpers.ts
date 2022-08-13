import { Validator } from "../services/Validator/validator";

export const validationOnBlur = (event, form) => {
  const v = new Validator(form);
  v.setSubmitButtonState(v.checkInputValidity(event));
};

export const getFormData = (formData) => {
  const res = {};
  for (const pair of formData.entries()) {
    res[pair[0]] = pair[1];
  }
  return res;
};
