import { Component } from '@angular/core';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

  constructor(
    private navbarService : NavbarServiceService
  ){
    navbarService.triggerNavAction()
  }

  ngOnInit(){
    this.navbarService.triggerNavAction()
  }
}
