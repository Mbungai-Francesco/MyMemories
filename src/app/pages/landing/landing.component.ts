import { Component } from '@angular/core';
import { User } from '../../types';
import { UserService } from '../../services/user/user.service';
import { ButtonComponent } from '../../components/shared/button/button.component';
import { RouterLink } from '@angular/router';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {
  user!: User;
  id = '';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private navbarService: NavbarServiceService
  ) {
    userService.user$.subscribe((user) => {
      if (user.id) {
        this.user = user;
        console.log(user);
      }
    });
    jwtService.jwt$.subscribe((res) => {
      if (res) {
        const decodedToken: any = jwtDecode(res);
        this.id = decodedToken.userId;
        console.log('logging', decodedToken);
        // console.log('logging',decodedToken.exp - decodedToken.iat);

        // getUser(this.id,res) .then(use =>{
        //   if(use){
        //     userService.setUser(use)
        //   }
        // })
      }
    });
  }

  ngOnInit(): void {
    this.navbarService.triggerNavAction();
  }
}
