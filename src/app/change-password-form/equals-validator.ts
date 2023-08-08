import { FormControl, ValidatorFn } from '@angular/forms';

export const mismatchErrorKey = 'mismatch';

export function createEqualsValidator(control: FormControl, matchControl: FormControl): ValidatorFn {
  return () => (control?.value === matchControl?.value ? null : { [mismatchErrorKey]: true });
}
