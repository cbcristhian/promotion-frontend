import { FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils{

  //Regular Expressions
  static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';

  static getTextError(errors:ValidationErrors){
    for (const key of Object.keys(errors)){
      switch(key){
        case 'required':
          return 'This field is required'
        case 'minlength':
          return `Min characters of ${errors['minlength'].requiredLength}`
        case 'min':
          return `Min value of ${errors['min'].min}`
        case 'pattern':
          return `The value is not a valid email`
      }
    }
    return null
  }

  static isValidField(form:FormGroup,fieldName:string):boolean|null{
    return form.controls[fieldName].errors &&
    form.controls[fieldName].touched
  }

  static getFieldError(form:FormGroup,fieldName:string):string |null{
    if(!form.controls[fieldName]) return null
    const errors= form.controls[fieldName].errors ?? {}

    return this.getTextError(errors)
  }
}
