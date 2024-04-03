import { AbstractControl } from "@angular/forms";


export class EmpValidator {
   static isEmpValid(control: AbstractControl){
        let value = control.value as string;
        if(!value){
            return null
        }

        let regExp = /^[A-z]\d{3}$/;
        let isRegExpValid = regExp.test(value)

        if(isRegExpValid){
            return null
        }else{
            return {
                msgForId : 'emp id must have to follow the required pattern'
            }
        }
    }
}