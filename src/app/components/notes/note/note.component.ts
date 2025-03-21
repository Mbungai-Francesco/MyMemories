import { Component, Input, input } from '@angular/core';
import { Note } from '../../../types';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [ ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent {
  @Input() note !: Note
  @Input() inId !: string
}
