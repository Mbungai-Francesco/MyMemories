 import { Component } from '@angular/core';
import { User } from '../../types';
import { UserService } from '../../services/user/user.service';
import { ButtonComponent } from "../../components/shared/button/button.component";

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  
  user !: User

  constructor(
    private userService: UserService
  ){
    userService.user$.subscribe(user => {
      if(user){
        this.user = user
        console.log(user);
        
      }
    })
  }

}
