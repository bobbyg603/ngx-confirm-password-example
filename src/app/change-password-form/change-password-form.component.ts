import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
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

  constructor(formBuilder: NonNullableFormBuilder) {
    const validators = [Validators.required, Validators.minLength(8), Validators.pattern(upperLowerSymbolNumberRegex)];

    const currentPassword = formBuilder.control('', validators);
    const newPassword = formBuilder.control('', validators);
    const confirmPassword = formBuilder.control('', validators);

    this.formGroup = formBuilder.group<ControlsOf<ChangePasswordFormGroup>>(
      {
        currentPassword,
        newPassword,
        confirmPassword,
      },
      {
        validators: createEqualsValidator(newPassword, confirmPassword),
      }
    );
  }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
