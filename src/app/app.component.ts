import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icountry } from './shared/model/country';
import { COUNTRIES_META_DATA } from './shared/const/country';
import { CustomRegex } from './shared/const/validators';
import { EmpValidator } from './shared/validators.ts/empIdValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'reactive-form';
  signUpForm! : FormGroup;
  allCountries : Array<Icountry> = [];

  ngOnInit(): void {
    this.allCountries = COUNTRIES_META_DATA;
    this.createSignUpForm();
    this.enableConfirmPassword();
    this.passAndConfirmPassErr();
    this.enableIsAddSame();
    this.patchCAtoPA();
  };

  patchCAtoPA(){
    this.f['isAddressSame'].valueChanges
      .subscribe(res => {
        // console.log(res);
        if(res){
          this.f['permenentAddress'].patchValue(this.f['currentAddress'].value);
          this.f['permenentAddress'].disable();
        }else{
          this.f['permenentAddress'].reset();
          this.f['permenentAddress'].enable();
        }
      })
  }

  enableIsAddSame(){
    this.f['currentAddress'].valueChanges
    .subscribe(res => {
      // console.log(res);
        if(this.f['currentAddress'].valid) {
          this.f['isAddressSame'].enable();
        }else{
          this.f['isAddressSame'].disable();
          this.f['isAddressSame'].patchValue(false)
        }
    })
  }

  passAndConfirmPassErr(){
    this.f['confirmPassword'].valueChanges
    .subscribe((res) => {
      // console.log(res);
      // console.log(this.f['password'].value === res);
      if(this.f['password'].value !== res){
        this.f['confirmPassword'].setErrors({'passMsgerror': 'password and confirm password must be same'})
      }
      
    })
  }

  enableConfirmPassword(){
    
    this.f['password'].valueChanges
        .subscribe((res) => {
          console.log(this.f['password'].valid);
          if(this.f['password'].valid){
            this.f['confirmPassword'].enable();
          }else{
            this.f['confirmPassword'].disable();
          }
          
        })
  }

  createSignUpForm(){
      this.signUpForm = new FormGroup({
        username: new FormControl(null, [
          Validators.required, 
          Validators.pattern(CustomRegex.username),
          Validators.minLength(5),
          Validators.maxLength(8)
        ]),
        email: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.email)]),
        empId: new FormControl(null, [Validators.required, EmpValidator.isEmpValid]),
        gender: new FormControl(null),
        currentAddress: new FormGroup({
          Country: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          pinCode: new FormControl(null, [Validators.required]),
        }),
        permenentAddress: new FormGroup({
          Country: new FormControl(null, [Validators.required]),
          state: new FormControl(null, [Validators.required]),
          city: new FormControl(null, [Validators.required]),
          pinCode: new FormControl(null, [Validators.required]),
        }),
        isAddressSame: new FormControl({value: false, disabled: true}),
        skills: new FormArray([new FormControl(null, [Validators.required])]),
        password: new FormControl(null, [Validators.required, Validators.pattern(CustomRegex.password)]),
        confirmPassword: new FormControl({value: null, disabled: true}, [Validators.required, Validators.pattern(CustomRegex.password)]),
      })
  };

  get f(){
    return this.signUpForm.controls
  };

  onSignUpForm(){

    console.log(this.signUpForm);
    
    console.log(this.signUpForm.value);
    // this.signUpForm.reset();

  };

  get skillsArray(){
    return this.signUpForm.get('skills') as FormArray;
  };

  onSkillsAdd(){
    if(this.skillsArray.length < 5){
      let control = new FormControl(null, [Validators.required]);
      this.skillsArray.push(control)
      // console.log(this.skillsArray);
      
    }
  };

  onSkillsRemove(i: number){
    this.skillsArray.removeAt(i)    
  }


}
