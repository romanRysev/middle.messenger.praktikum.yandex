import { Validator } from "../services/validator/validator";

type ValidationOnBlur = (event: SubmitEvent, form: HTMLFormElement) => void;

export const validationOnBlur: ValidationOnBlur = (event, form) => {
  const v = new Validator(form);
  v.setSubmitButtonState(v.checkInputValidity(event));
};

export const getFormData = (formData: FormData) => {
  const formDataObject: Record<string, FormDataEntryValue> = {};
  for (const pair of formData.entries()) {
    formDataObject[pair[0]] = pair[1];
  }
  return formDataObject;
};
