import { Validator } from "../services/validator/validator";

export type ValidationOnBlur = (event: Event) => void;

export const validationOnBlur: ValidationOnBlur = (event) => {
  const form = (event.target as HTMLInputElement).closest("form");
  if (!form) {
    return;
  }
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

export function isEqual(a: Indexed, b: Indexed): boolean {
  const res = Object.keys(a).filter((key) => {
    if (typeof a[key] !== "object" || a[key] === null) {
      return a[key] !== b[key];
    } else {
      return !isEqual(a[key] as Indexed, b[key] as Indexed);
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
      if ((rhs[p] as object).constructor === Object) {
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
    value as Indexed
  );
  return merge(object as Indexed, result);
}
