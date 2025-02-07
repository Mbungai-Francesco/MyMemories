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
import { getUserByMail, loginUser } from '../../api/userApi';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { UserService } from '../../services/user/user.service';
import { UserLogin } from '../../types';
import { JwtService } from '../../services/jwt/jwt.service';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule, RouterLink, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  invalidCredentials = false;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router,
    private userService : UserService,
    private jwtService : JwtService,
    private navbarService : NavbarServiceService
  ){}

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.navbarService.triggerNavAction()
  }

  login(){
    if(this.loginForm.valid){
      const email = this.loginForm.value.email as string;
      const password = this.loginForm.value.password as string;
      loginUser(email, password).then((res) =>{
        if(res){ 
          console.log('Login successful:', res);
          this.userService.setUser(res)
          this.jwtService.setJwt(res.jwt || '')
          this.router.navigate(['/notes']);
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

  loginWithGoogle(){
    this.authService.googleSignIn()
    .then(res => {
      getUserByMail(res.user.email || '').then(user =>{
        if(user){
          console.log('User:', user);
          this.userService.setUser(user)
          this.router.navigate(['/notes']);
        }
        else{
          console.log('User not found');
        }
      })
    })
    .catch(error => console.error(error));
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