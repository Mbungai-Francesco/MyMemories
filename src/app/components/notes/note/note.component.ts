import { Component, Input, input } from '@angular/core';
import { Note } from '../../../types';
import { DateUtilsService } from '../../../services/utils/date-utils.service';

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

  constructor(public dateUtils: DateUtilsService){}

}
