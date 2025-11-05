import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Note } from '../../types';
import { getUserNotes } from '../../api/notesApi';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesSubject = new BehaviorSubject<Note[]>([]);
  notes$ = this.notesSubject.asObservable();

  constructor() { }
  // Fetch all tags from the API and set them in the BehaviorSubject
  getAllUserNotes(id: string, jwt : string){
    getUserNotes(id,jwt).then((res)=>{
      if(res) this.setNotes(res)
    })
  }

  // Set the tags in the BehaviorSubject
  // This will notify all subscribers of the new value
  setNotes(notes : Note[]){
    this.notesSubject.next(notes)
  }
}
