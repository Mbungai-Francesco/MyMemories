import { Component } from '@angular/core';
import { BadgePlus, ChevronsUpDown, LucideAngularModule, Notebook, PlusCircle, Settings, X } from 'lucide-angular';
import { NavButtonComponent } from "../nav-button/nav-button.component";
import { TagComponent } from '../../notes/tag/tag.component';
import { Tag, User } from '../../../types';
import { UserService } from '../../../services/user/user.service';
import { getUserTags } from '../../../api/tagsApi';
import { JwtService } from '../../../services/jwt/jwt.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, NavButtonComponent, TagComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tags : Tag[] = []
  user !: User

  constructor(
    private jwtService : JwtService
  ){
    jwtService.jwt$.subscribe(jwt => {
      if(jwt) getUserTags(jwtService.getId(),jwt).then(res =>{
        if(res){
          console.log(res);
          this.tags = res
        }
      })
    })
  }

  readonly icons = { X, PlusCircle, Notebook, Settings, BadgePlus, ChevronsUpDown }
}
