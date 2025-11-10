import { Component } from '@angular/core';
import { BadgePlus, ChevronsUpDown, LucideAngularModule, Notebook, PlusCircle, RefreshCcw, Settings, Trash2, X } from 'lucide-angular';
import { NavButtonComponent } from "../nav-button/nav-button.component";
import { TagComponent } from '../../notes/tag/tag.component';
import { Tag, User } from '../../../types';
import { UserService } from '../../../services/user/user.service';
import { getUserTags } from '../../../api/tagsApi';
import { JwtService } from '../../../services/jwt/jwt.service';
import { getUser } from '../../../api/userApi';
import { RouterLink } from '@angular/router';
import { CreateTagComponent } from "../../popups/create-tag/create-tag.component";
import { LoaderComponent } from "../loader/loader.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, NavButtonComponent, TagComponent, RouterLink, CreateTagComponent, LoaderComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tags : Tag[] = []
  user !: User
  visible = true

  jwt = ''

  isLoading = false;
  state = '';
  message = '';

  constructor(
    private jwtService : JwtService
  ){
    jwtService.jwt$.subscribe(jwt => {
      if(jwt){
        this.jwt = jwt
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

  readonly icons = { X, PlusCircle, Notebook, Settings, BadgePlus, ChevronsUpDown, Trash2, RefreshCcw }

  closeToast() {
    this.message = '';
    this.state = '';
    this.isLoading = false;
  }

  fetchTags(token?: string) {
    const tok = token || this.jwt;
    getUserTags(this.jwtService.getId(), tok).then(
      (res) => (this.tags = res)
    );
  }

  loadToast = (mesg: string, duration: number, state: string) => {
    this.message = mesg;
    this.state = state;
    this.isLoading = true;

    if (duration > 0)
      setTimeout(() => {
        this.closeToast();
      }, duration);
  };

  showCreateTag(){
    this.visible = !this.visible
  }

  deletedTag(){
    this.loadToast("Tag Deleted",3000,'success')
    this.fetchTags()
  }

}
