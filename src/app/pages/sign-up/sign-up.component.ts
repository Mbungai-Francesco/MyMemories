import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserDto } from '../../types';
import { createUser } from '../../api/userApi';
import { UserService } from '../../services/user/user.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUp!: FormGroup;
  invalidCredentials = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService : UserService,
    private jwtService : JwtService,
    private navbarService : NavbarServiceService
  ) {}

  ngOnInit() {
    this.signUp = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.strongPasswordValidator()]],
    });
    this.navbarService.triggerNavAction()
  }

  // Custom password validator: At least 6 characters, with a number & uppercase letter
  strongPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if (!value) {
        return null;  // If no input, don't show error
      }

      const hasUpperCase = /[A-Z]/.test(value);
      const hasNumber = /\d/.test(value);
      const minLength = value.length >= 6;

      if (!hasUpperCase || !hasNumber || !minLength) {
        return { weakPassword: true }; // Return an error object
      }

      return null; // Valid password
    };
  }

  sign_up(){
    if(this.signUp.valid){
      const val = this.signUp.value;
      const user : UserDto = {
        firstname: val.firstname,
        lastname: val.lastname,
        email: val.email,
        password: val.password
      }
      createUser(user).then((res) =>{
        if(res){
          this.userService.setUser(res)
          this.jwtService.setJwt(res.jwt || '')
          this.router.navigate(['/notes']); // Redirect to login page
          console.log('Sign up successful:', res);
          // this.invalidCredentials = false;
        }else{
          console.log('Sign up failed:');
          // this.invalidCredentials = true;
        }
      })
      console.log(this.signUp.value);
    }
  }
}
