import { Validator } from "../services/validator/validator";

export type ValidationOnBlur = (form: HTMLFormElement) => void;

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

export function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== "object" || object === null) {
    return object;
  }

  if (typeof path !== "string") {
    throw new Error("path must be string");
  }

  const result = path.split(".").reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any
  );
  return merge(object as Indexed, result);
}
