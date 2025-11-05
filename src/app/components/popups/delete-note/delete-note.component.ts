import { Component } from '@angular/core';
import { PopCardComponent } from "../pop-card/pop-card.component";
import { NavButtonComponent } from "../../shared/nav-button/nav-button.component";

@Component({
  selector: 'app-delete-note',
  standalone: true,
  imports: [PopCardComponent, NavButtonComponent],
  templateUrl: './delete-note.component.html',
  styleUrl: './delete-note.component.css'
})
export class DeleteNoteComponent {

  confirmDelete() {}

  cancel() {}
}
