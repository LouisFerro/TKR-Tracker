import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive} from "@angular/core";

export const identityEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const email = control.get('email');
  const email2 = control.get('email2');

  return (email && email2 && email.value === email2.value) ? null : { identityEmail: true };
};

@Directive({
  selector: '[appIdentityEmail]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: IdentityEmailValidatorDirective, multi: true}]
})
export class IdentityEmailValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return identityEmailValidator(control);
  }
}
