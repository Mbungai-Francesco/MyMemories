import { Component } from '@angular/core';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';
import { Note, Tag, User } from '../../types';
import { UserService } from '../../services/user/user.service';
import { NavButtonComponent } from '../../components/shared/nav-button/nav-button.component';
import {
  Archive,
  Clock,
  LucideAngularModule,
  Plus,
  PlusCircle,
  Tag as tag,
  Trash2,
} from 'lucide-angular';
import { NoteComponent } from '../../components/notes/note/note.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { getNotes, getUserNotes, updateNote } from '../../api/notesApi';
import { JwtService } from '../../services/jwt/jwt.service';
import { DialogModule, Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CreateNoteComponent } from '../../components/popups/create-note/create-note.component';
import { DateUtilsService } from '../../services/utils/date-utils.service';
import { getUserTags } from '../../api/tagsApi';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NavButtonComponent,
    NoteComponent,
    LucideAngularModule,
    FormsModule,
    LoaderComponent,
    CreateNoteComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  tags: Tag[] = [];
  user!: User;
  selected!: Note;
  tempContent = '';
  tempTitle = '';
  jwt = '';

  isLoading = false;
  state = '';
  message = '';
  visible: boolean = true;

  readonly icons = { PlusCircle, Plus, tag, Clock, Archive, Trash2 };

  // Sample notes data
  notes: Note[] = [];

  constructor(
    private navbarService: NavbarServiceService,
    private userService: UserService,
    private jwtService: JwtService,
    public dateUtils: DateUtilsService
  ) {
    navbarService.triggerNavAction();

    userService.user$.subscribe((use) => {
      this.user = use;
    });
    jwtService.jwt$.subscribe((jwt) => {
      this.jwt = jwt;
      this.fetchNotes(jwt);
      this.fetchTags(jwt);
    });
  }

  ngOnInit() {
    this.navbarService.triggerNavAction();
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

  closeToast() {
    this.message = '';
    this.state = '';
    this.isLoading = false;
  }

  showDialog() {
    this.visible = !this.visible;
  }

  preview(note: Note) {
    this.selected = note;
    this.tempContent = note.content;
    this.tempTitle = note.title;
  }

  undo() {
    this.tempTitle = this.selected.title;
    this.tempContent = this.selected.content;
  }

  fetchNotes(token: string) {
    // getNotes(token).then((res) => {
    //   this.notes = [...res];
    //   this.selected = res[0];
    //   this.tempContent = res[0].content;
    //   this.tempTitle = res[0].title;
    // });
    getUserNotes(this.jwtService.getId(), token).then((res) => {
      this.notes = [...res];
      if (this.notes.length > 0) {
        this.selected = res[0];
        this.tempContent = res[0].content;
        this.tempTitle = res[0].title;
      }
    });
  }

  fetchTags(token: string) {
    getUserTags(this.jwtService.getId(), token).then(
      (res) => (this.tags = res)
    );
  }

  // ...existing methods

  // Example of how to use the loader:
  update() {
    this.loadToast("Saving ...",0,'pending')
    this.selected.time = new Date().toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', minute: '2-digit' })
    this.selected.content = this.tempContent
    console.log(this.selected);
    updateNote(this.selected, this.jwt).then((res) => {
      this.loadToast("Updated",3000,'success')
      this.selected = res;
      this.tempContent = res.content;
      this.tempTitle = res.title;
    }).catch(()=>{
      this.loadToast("Failed to update",3000,'failed')
    });

    // Simulate an API call
    // setTimeout(() => {
    //   // Update the note
    //   // this.selected.title = this.tempTitle;
    //   // this.selected.content = this.tempContent;

    //   // End loading state
    //   this.isLoading = false;
    // }, 2000);
  }
}
