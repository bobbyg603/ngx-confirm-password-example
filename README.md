# 📐📋🦸 Angular Super Forms: Confirm Password

[![medium profile link](https://img.shields.io/badge/Medium-12100E?style=for-the-badge&logo=medium&logoColor=white)]([https://medium.com/better-programming/file-uploads-with-angular-and-rxjs-34262b3450ae](https://medium.com/p/bd95906f220f))
[![twitter profile link](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)]([https://twitter.com/bobbyg603/status/1524465334522195968](https://twitter.com/bobbyg603/status/1689632582994907136))

<img alt="Angualr Super Forms Confirm Password" src="https://github.com/bobbyg603/ngx-confirm-password-example/assets/2646053/332f4d5b-70d9-46ce-b20e-ea30aed5f26b" width="540px" height="auto">

This is is a companion repo for [Angular Super Forms: Confirm Password](https://medium.com/p/bd95906f220f) that demonstrates how to build a confirm password form with [ng-bootstrap](https://ng-bootstrap.github.io/#/home), [error-tailor](https://github.com/ngneat/error-tailor), c[omponent validation](https://medium.com/p/bd95906f220f#c02e), [styling](https://medium.com/p/bd95906f220f#b7b4), and [form validation](https://medium.com/p/bd95906f220f#e1f3). Topics in this article include how to configure error-tailor for professional looking errors, validate individual fields, as well as creating a form that validates two components have the same value.

## ☕️ TL;DR

Clone this repo to your workspace:

```sh
git clone https://github.com/bobbyg603/ngx-confirm-password-example
```

Install the dependencies and start the application:

```sh
cd ngx-confirm-password-example && npm i && npm start
```

Enter invalid values into the form and click away from the inputs. Also enter a value for new password that doesn't match the value for confirm password before hitting submit. You should see several field validation errors as well as a form validation error at the bottom.

## 🕵️ Inspecting the Code

There are a few things in [change-password-form.component.ts](https://github.com/bobbyg603/ngx-confirm-password-example/blob/main/src/app/change-password-form/change-password-form.component.ts) that are worth mentioning.

The first thing to notice is [`ControlsOf<ChangePasswordFormGroup>`](https://github.com/bobbyg603/ngx-confirm-password-example/blob/4fe68dd3255808e13742b573437987fb25c9b697/src/app/change-password-form/change-password-form.component.ts#L14C26-L14C26). The `ControlsOf` utility type allows us to convert an interface’s string types to `FormControl<string>` types. This allows us to define the data model with a single interface and ensure that our form adheres to the same interface.

Here’s what `ControlsOf<ChangePasswordFormGroup>` evaluates to:

```ts
interface ControlsOf<ChangePasswordFormGroup> {
  currentPassword: FormControl<string>;
  newPassword: FormControl<string>;
  confirmPassword: FormControl<string>;
}
```

More info on the `ControlsOf` utility type can be found [here](https://betterprogramming.pub/how-to-build-a-strongly-typed-angular-14-super-form-86837965a0e5).

The next piece worth noting is that we’re injecting NonNullableFormBuilder into the constructor. We use the [`NonNullableFormBuilder`](https://angular.io/guide/typed-forms#formbuilder-and-nonnullableformbuilder) because otherwise, we get compiler errors that `FormControl<string | null>` cannot be assigned to an object expecting the type `FormControl<string>`.

```ts
constructor(formBuilder: NonNullableFormBuilder) { ... }
```

Finally, we’ve also created an array of validators that we’re passing to each of the form controls.

```ts
const validators = [Validators.required, Validators.minLength(8), Validators.pattern(upperLowerSymbolNumberRegex)];

const currentPassword = formBuilder.control('', validators);
const newPassword = formBuilder.control('', validators);
const confirmPassword = formBuilder.control('', validators);
```

Notice that we’re using `Validators.pattern(upperLowerSymbolNumberRegex)`. This regular expression was found on [Stack Overflow](https://stackoverflow.com/a/1559788/2993077), and we created a `const` with a descriptive name so that the next developer to work on the code can more easily understand the purpose of the complicated regular expression.

Last but not least, let's take a look at the template in [change-password-form.component.html](https://github.com/bobbyg603/ngx-confirm-password-example/blob/main/src/app/change-password-form/change-password-form.component.html).

<div class="container">
  <div class="row justify-content-center">
    <div class="col-12 col-md-6 col-lg-3 text-center">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Change Password</h5>
          <p class="card-text">Fill in the form below and click submit to update your password.</p>
          <form class="form-group" [formGroup]="formGroup" (ngSubmit)="onSubmit()" errorTailor>
            <input class="form-control" formControlName="currentPassword" placeholder="Current Password" type="password" >
            <input class="form-control mt-2" formControlName="newPassword" placeholder="New Password" type="password">
            <input class="form-control mt-2" formControlName="confirmPassword" placeholder="Confirm Password" type="password">
            <button class="btn btn-primary mt-2" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

Notice that on the very end of the `<form>` tag we’ve added the `errorTailor` directive. The `errorTailor` directive makes validation messages magically appear when a form control has been changed and unfocused.

Thank you for your support ❤️
