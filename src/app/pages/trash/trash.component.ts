import { Component } from '@angular/core';
import { Note, Tag, User } from '../../types';
import {
  PlusCircle,
  Plus,
  Tag as tag,
  Clock,
  Trash2,
  LucideAngularModule,
  ArchiveRestore,
} from 'lucide-angular';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';
import { UserService } from '../../services/user/user.service';
import { JwtService } from '../../services/jwt/jwt.service';
import { DateUtilsService } from '../../services/utils/date-utils.service';
import { deleteNote, getUserNotes, updateNote } from '../../api/notesApi';
import { getUserTags } from '../../api/tagsApi';
import { NoteComponent } from '../../components/notes/note/note.component';
import { LoaderComponent } from '../../components/shared/loader/loader.component';
import { NavButtonComponent } from '../../components/shared/nav-button/nav-button.component';

@Component({
  selector: 'app-trash',
  standalone: true,
  imports: [
    NavButtonComponent,
    NoteComponent, 
    LucideAngularModule, 
    LoaderComponent
  ],
  templateUrl: './trash.component.html',
  styleUrl: './trash.component.css',
})
export class TrashComponent {
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

  readonly icons = { PlusCircle, Plus, tag, Clock, ArchiveRestore, Trash2 };

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
    this.tempContent = note.content || "";
    this.tempTitle = note.title;
  }

  undo() {
    this.tempTitle = this.selected.title;
    this.tempContent = this.selected.content || "";
  }

  fetchNotes(token: string) {
    // getNotes(token).then((res) => {
    //   this.notes = [...res];
    //   this.selected = res[0];
    //   this.tempContent = res[0].content;
    //   this.tempTitle = res[0].title;
    // });
    getUserNotes(this.jwtService.getId(), token).then((res) => {
      this.notes = res.filter((val) => val.deleted);
      if (this.notes.length > 0) {
        this.selected = this.notes[0];
        this.tempContent = this.notes[0].content || "";
        this.tempTitle = this.notes[0].title;
      }
    });
  }

  fetchTags(token: string) {
    getUserTags(this.jwtService.getId(), token).then(
      (res) => (this.tags = res)
    );
  }

  restoreNote() {
    this.loadToast('Restoring ...', 0, 'pending');
    this.selected.time = new Date().toLocaleTimeString('en-GB', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
    });
    this.selected.content = this.tempContent;
    this.selected.deleted = false;
    console.log(this.selected);
    updateNote(this.selected, this.jwt)
      .then((res) => {
        this.loadToast('Restored', 3000, 'success');
        this.selected = undefined!;
        this.fetchNotes(this.jwt);
      })
      .catch(() => {
        this.loadToast('Failed to Restore', 3000, 'failed');
      });
  }

  delNote() {
    this.loadToast('Deleting ...', 0, 'pending');
    deleteNote(this.selected.id, this.jwt)
      .then(() => {
        this.loadToast('Deletion successful', 3000, 'success');
        this.selected = undefined!;
        this.fetchNotes(this.jwt);
      })
      .catch(() => {
        this.loadToast('Failed to delete', 3000, 'failed');
      });
  }
}
