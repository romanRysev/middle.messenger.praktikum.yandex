import { Validator } from "../services/validator/validator";

type ValidationOnBlur = (form: HTMLFormElement) => void;

export const validationOnBlur: ValidationOnBlur = (form) => {
  const v = new Validator(form);
  v.getFormValidity();
};

export const getFormData = (formData: FormData) => {
  const formDataObject: Record<string, FormDataEntryValue> = {};
  for (const pair of formData.entries()) {
    formDataObject[pair[0]] = pair[1];
  }
  return formDataObject;
};

export function isEqual(a: object, b: object): boolean {
  const res = Object.keys(a).filter((key) => {
    if (typeof (a as Indexed)[key] !== "object" || (a as Indexed)[key] === null) {
      return (a as Indexed)[key] !== (b as Indexed)[key];
    } else {
      return !isEqual((a as Indexed)[key] as object, (b as Indexed)[key] as object);
    }
  });

  return res.length === 0;
}
