import { AbstractControl } from '@angular/forms';

export function ValidateUsername(control: AbstractControl) {
  let pattern = /^(?=[a-zA-Z])[a-zA-Z0-9._]*$/;
  if (control.value && !pattern.test(control.value)) {
    return { validUsername: true };
  }
  return null;
}