import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';
import { ChangePasswordFormGroup } from './change-password-form-group';
import { ChangePasswordFormComponent } from './change-password-form.component';

describe('ChangePasswordFormComponent', () => {
  let component: ChangePasswordFormComponent;
  let fixture: ComponentFixture<ChangePasswordFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangePasswordFormComponent],
      providers: [provideErrorTailorConfig({})],
      imports: [ReactiveFormsModule, errorTailorImports]
    });
    fixture = TestBed.createComponent(ChangePasswordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('formGroup', () => {
    let currentPassword: AbstractControl<string, ChangePasswordFormGroup['currentPassword']>;
    let newPassword: AbstractControl<string, ChangePasswordFormGroup['newPassword']>;
    let confirmPassword: AbstractControl<ChangePasswordFormGroup['confirmPassword']>;

    beforeEach(() => {
      currentPassword = component.formGroup.get('currentPassword')!;
      newPassword = component.formGroup.get('newPassword')!;
      confirmPassword = component.formGroup.get('confirmPassword')!;
    });

    it('should validate currentPassword required', () => {
      currentPassword.setValue('');
      expect(currentPassword.errors?.['required']).toBeTruthy();
    });

    it('should validate currentPassword minlength', () => {
      currentPassword.setValue('1234567');
      expect(currentPassword.errors?.['minlength']).toBeTruthy();
    });

    it('should validate currentPassword pattern', () => {
      currentPassword.setValue('password');
      expect(currentPassword.errors?.['pattern']).toBeTruthy();
    });

    it('should validate newPassword required', () => {
      newPassword.setValue('');
      expect(newPassword.errors?.['required']).toBeTruthy();
    });

    it('should validate newPassword minlength', () => {
      newPassword.setValue('1234567');
      expect(newPassword.errors?.['minlength']).toBeTruthy();
    });

    it('should validate newPassword pattern', () => {
      newPassword.setValue('password');
      expect(newPassword.errors?.['pattern']).toBeTruthy();
    });

    it('should validate confirmNewPassword required', () => {
      confirmPassword.setValue('');
      expect(confirmPassword.errors?.['required']).toBeTruthy();
    });

    it('should validate confirmNewPassword minlength', () => {
      confirmPassword.setValue('1234567');
      expect(confirmPassword.errors?.['minlength']).toBeTruthy();
    });

    it('should validate confirmNewPassword pattern', () => {
      confirmPassword.setValue('password');
      expect(confirmPassword.errors?.['pattern']).toBeTruthy();
    });

    it('should validate confirmNewPassword equals newPassword', () => {
      newPassword?.setValue('Password123!');
      confirmPassword?.setValue('Password123!');

      expect(component.formGroup.errors).toBeNull();
      expect(confirmPassword?.errors).toBeNull();
    });

    it('should validate confirmNewPassword not equals newPassword', () => {
      newPassword?.setValue('Password123!');
      confirmPassword?.setValue('Password1234!');

      expect(component.formGroup.errors).toEqual({ mismatch: true });
    });
  });
});
