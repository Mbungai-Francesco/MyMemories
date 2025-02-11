import { Component } from '@angular/core';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';
import { Tag, User } from '../../types';
import { getTags } from '../../api/tagsApi';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  tags : Tag[] = []
  user !: User

  constructor(
    private navbarService : NavbarServiceService,
    private userService : UserService
  ){
    navbarService.triggerNavAction()
    userService.user$.subscribe(use => {
      this.user = use
      this.tags = use.tags
    })
  }

  ngOnInit(){
    this.navbarService.triggerNavAction()
  }
}
