import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl, 
  ValidationErrors, 
  ValidatorFn
} from '@angular/forms';
import { loginUser } from '../../api/userApi';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup;
  invalidCredentials = false;
  
  constructor(
    private fb: FormBuilder
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.email as string;
      loginUser(email, password).then((res) =>{
        if(res){
          console.log('Login successful:', res);
          this.invalidCredentials = false;
        }
        else{
          console.log('Login failed:');
          this.invalidCredentials = true;
        }
      })
      console.log(this.loginForm.value);
    }
  }
}

// // Custom password validator: At least 6 characters, with a number & uppercase letter
// export function strongPasswordValidator(): ValidatorFn {
//   return (control: AbstractControl): ValidationErrors | null => {
//     const value = control.value;
//     if (!value) {
//       return null;  // If no input, don't show error
//     }

//     const hasUpperCase = /[A-Z]/.test(value);
//     const hasNumber = /\d/.test(value);
//     const minLength = value.length >= 6;

//     if (!hasUpperCase || !hasNumber || !minLength) {
//       return { weakPassword: true }; // Return an error object
//     }

//     return null; // Valid password
//   };
// }