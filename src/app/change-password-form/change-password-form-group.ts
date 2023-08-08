import { FormGroup, FormControl } from '@angular/forms';

export interface ChangePasswordFormGroup {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export type ControlsOf<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends Record<any, any>
    ? FormGroup<ControlsOf<T[K]>>
    : FormControl<T[K]>;
};
