import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangePasswordFormGroup, ControlsOf } from './change-password-form-group';
import { createEqualsValidator } from './equals-validator';

const upperLowerSymbolNumberRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss']
})
export class ChangePasswordFormComponent {
  formGroup: FormGroup<ControlsOf<ChangePasswordFormGroup>>;

  private currentPasswordFormControl: FormControl<ChangePasswordFormGroup['currentPassword']>;
  private newPasswordFormControl: FormControl<ChangePasswordFormGroup['newPassword']>;
  private confirmPasswordFormControl: FormControl<ChangePasswordFormGroup['confirmPassword']>;

  constructor({ nonNullable }: FormBuilder) {
    const validators = [Validators.required, Validators.minLength(8), Validators.pattern(upperLowerSymbolNumberRegex)];

    this.currentPasswordFormControl = nonNullable.control('', validators);
    this.newPasswordFormControl = nonNullable.control('', validators);
    this.confirmPasswordFormControl = nonNullable.control('', validators);

    this.formGroup = nonNullable.group<ControlsOf<ChangePasswordFormGroup>>(
      {
        currentPassword: this.currentPasswordFormControl,
        newPassword: this.newPasswordFormControl,
        confirmPassword: this.confirmPasswordFormControl,
      },
      {
        validators: createEqualsValidator(this.newPasswordFormControl, this.confirmPasswordFormControl),
      }
    );
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
