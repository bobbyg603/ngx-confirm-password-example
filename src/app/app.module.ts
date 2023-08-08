import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { errorTailorImports, provideErrorTailorConfig } from '@ngneat/error-tailor';
import { mismatchErrorKey } from './change-password-form/equals-validator';

@NgModule({
  declarations: [
    AppComponent,
    ChangePasswordFormComponent
  ],
  imports: [
    BrowserModule,
    errorTailorImports,
    NgbModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    provideErrorTailorConfig({
      errors: {
        useValue: {
          required: 'This field is required',
          minlength: ({ requiredLength }) => `Field must be ${requiredLength} characters`,
          pattern: 'Field must one uppercase, one lowercase, one number, and one special character',
          [mismatchErrorKey]: 'Passwords must match',
        }
      }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
