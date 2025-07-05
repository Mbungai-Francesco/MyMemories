import { Component, EventEmitter, Input, Output, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NoteDto, Tag, User } from '../../../types';
import { TagComponent } from '../../notes/tag/tag.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { JwtService } from '../../../services/jwt/jwt.service';
import { createNote } from '../../../api/notesApi';
@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [FormsModule, TagComponent, CommonModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  @Input({ required: true }) tags: Tag[] = [];
  @Output() closeNote = new EventEmitter<void>();
  @Output() refetchNotes = new EventEmitter<string>();

  jwt = '';

  title = '';
  selectedTags: Set<string> = new Set<string>();

  constructor(
    private jwtService: JwtService
  ) {
    jwtService.jwt$.subscribe((jwt) => {
      this.jwt = jwt;
    });
  }

  ngOnInit() {}

  addTag(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    const id = selectElement.value;
    if (id) this.selectedTags.add(id);
  }

  removeTag(id: string) {
    this.selectedTags.delete(id);
  }

  getTag(id: string) {
    return this.tags.find((val) => val.id == id);
  }

  create() {    
    if (this.title) {
      const newNote: NoteDto = {
        title: this.title,
        tagIds: Array.from(this.selectedTags),
        userId: this.jwtService.getId(),
        date: new Date(),
      };
      console.log(newNote);
      createNote(newNote, this.jwt).then(
        (res) =>{
          console.log('Note created successfully:', res)
          this.closeNote.emit();
          this.refetchNotes.emit(this.jwt);
        }
      );
    }
  }

  close() {
    this.title = '';
    this.selectedTags.clear();
    this.closeNote.emit();
  }
}
