import { Component, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./components/shared/navbar/navbar.component";
import { JwtService } from './services/jwt/jwt.service';
import { User } from './types';
import { UserService } from './services/user/user.service';
import { jwtDecode } from 'jwt-decode';
import { getUser } from './api/userApi';
import { WINDOW } from './app.config';
import { NavbarServiceService } from './services/navbar/navbar-service.service';
// import { HeaderComponent } from "./components/shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myMemories';

  user !: User
  id = ''
  jwt !: string | null

  active = false

  constructor (
    @Inject(WINDOW) private window: Window,
    private userService : UserService,
    private jwtService : JwtService,
    private navbarService : NavbarServiceService
  ){
    this.jwt = sessionStorage.getItem('jwt');
    this.jwt = this.jwt ? JSON.parse(this.jwt) : null
    if(this.jwt){
      console.log('jwt',this.jwt);
      
      const decodedToken: any = jwtDecode(this.jwt); 
      this.id = decodedToken.userId
      // console.log('logging',decodedToken);
      // console.log('logging',decodedToken.exp - decodedToken.iat);
      
      // getUser(this.id,this.jwt) .then(use =>{
      //   if(use){
      //     console.log(use);
      //     userService.setUser(use)
      //   }
      // })    
    }
    navbarService.navAction$.subscribe(()=>{
      this.checkRoute()
    })
    this.checkRoute()
  }

  checkRoute = () =>{
    let val = this.window.location.pathname.split('/')[1]
    if(val == 'login' || val == '' || val == 'sign-up') this.active = false
    else this.active = true
  }
}
