import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";
import {Directive, Input} from "@angular/core";

/** A name can't match the given regular expression */
export function regexValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const allowed = !nameRe.test(control.value);
    //console.log("val1: " + control.value);
    let res = allowed ? {Name: {value: control.value}} : null;
    //console.log("val1: " + control.value + " +++ " + res);
    return res;
  };
}


@Directive({
  selector: '[appRegexName]',
  standalone: true,
  providers: [{provide: NG_VALIDATORS, useExisting: RegexValidatorDirective, multi: true}]
})
export class RegexValidatorDirective implements Validator {
  @Input('appRegexName') name = '';

  validate(control: AbstractControl): ValidationErrors | null {
    let res = this.name ? regexValidator(new RegExp(this.name, 'i'))(control) : null;
    console.log("val2: " + this.name + " --- " + res);
    return res;
  }
}

