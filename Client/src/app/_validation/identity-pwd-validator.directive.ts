import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive} from "@angular/core";

export const identityPwdValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password = control.get('password');
  const password2 = control.get('password2');

  return (password && password2 && password.value === password2.value) ? null : { identityPwd: true };
};

@Directive({
  selector: '[appIdentityPwd]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: IdentityPwdValidatorDirective, multi: true}]
})
export class IdentityPwdValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return identityPwdValidator(control);
  }
}
