import { Component } from '@angular/core';
import { BadgePlus, ChevronsUpDown, LucideAngularModule, Notebook, PlusCircle, Settings, Trash2, X } from 'lucide-angular';
import { NavButtonComponent } from "../nav-button/nav-button.component";
import { TagComponent } from '../../notes/tag/tag.component';
import { Tag, User } from '../../../types';
import { UserService } from '../../../services/user/user.service';
import { getUserTags } from '../../../api/tagsApi';
import { JwtService } from '../../../services/jwt/jwt.service';
import { getUser } from '../../../api/userApi';
import { RouterLink } from '@angular/router';
import { CreateTagComponent } from "../../popups/create-tag/create-tag.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, NavButtonComponent, TagComponent, RouterLink, CreateTagComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tags : Tag[] = []
  user !: User
  visible = true

  constructor(
    private jwtService : JwtService
  ){
    jwtService.jwt$.subscribe(jwt => {
      if(jwt){
        getUserTags(jwtService.getId(),jwt).then(res =>{
          if(res){
            console.log(res);
            this.tags = res
          }
        })
        getUser(jwtService.getId(),jwt).then(res =>{
          if(res) this.user = res
        })
      }
    })
  }

  readonly icons = { X, PlusCircle, Notebook, Settings, BadgePlus, ChevronsUpDown, Trash2 }

  fetchTags(token: string) {
    getUserTags(this.jwtService.getId(), token).then(
      (res) => (this.tags = res)
    );
  }

  showCreateTag(){
    this.visible = !this.visible
  }
}
