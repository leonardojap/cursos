import { ValidatorFn } from '@angular/forms';

const PATTERN_EMAIL = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

const RENAME_VALIDATOR_ERROR =
  (validator: ValidatorFn, name: string) =>
  (...s: Parameters<ValidatorFn>): ReturnType<ValidatorFn> => {
    const values: any = validator(...s);
    return values ? { [name]: values.pattern } : values;
  };

export { PATTERN_EMAIL, RENAME_VALIDATOR_ERROR };
