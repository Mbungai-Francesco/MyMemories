import { Component } from '@angular/core';
import { NavbarServiceService } from '../../services/navbar/navbar-service.service';
import { Note, Tag, User } from '../../types';
import { getTags } from '../../api/tagsApi';
import { UserService } from '../../services/user/user.service';
import { NavButtonComponent } from '../../components/shared/nav-button/nav-button.component';
import { Clock, LucideAngularModule, Plus, PlusCircle, Tag as tag } from 'lucide-angular';
import { NoteComponent } from "../../components/notes/note/note.component";
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from '../../components/shared/loader/loader.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [NavButtonComponent, NoteComponent, LucideAngularModule, FormsModule, LoaderComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {
  tags : Tag[] = []
  user !: User
  selected !: Note
  tempContent = ''
  tempTitle = ''
  isLoading = false;
  fullscreen = false

  readonly icons = { PlusCircle, Plus, tag, Clock }

  // Sample notes data
  notes: Note[] = [
    {
      id: '1',
      title: 'Meeting with Team',
      date: new Date('2025-03-15'),
      time: '10:00',
      content: 'Discussed project timeline and assigned tasks to team members.',
      tags: [
        { id: 't1', name: 'Work', color: '#ff5722', userId: 'user1' },
        { id: 't2', name: 'Important', color: '#e91e63', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '2',
      title: 'Grocery List',
      date: new Date('2025-03-18'),
      time: '15:30',
      content: 'Milk, eggs, bread, cheese, fruits, vegetables, chicken.',
      tags: [{ id: 't3', name: 'Personal', color: '#4caf50', userId: 'user1' }],
      userId: 'user1',
    },
    {
      id: '3',
      title: 'Project Ideas',
      date: new Date('2025-03-10'),
      time: '19:45',
      content:
        'New app concept: a memory journal that uses AI to suggest relevant tags and categories.',
      tags: [
        { id: 't4', name: 'Ideas', color: '#2196f3', userId: 'user1' },
        { id: 't5', name: 'Creative', color: '#9c27b0', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '4',
      title: 'Book Recommendations',
      date: new Date('2025-03-20'),
      time: '22:15',
      content:
        'Atomic Habits by James Clear, The Psychology of Money by Morgan Housel.',
      tags: [{ id: 't6', name: 'Reading', color: '#795548', userId: 'user1' }],
      userId: 'user1',
    },
    {
      id: '5',
      title: 'Workout Plan',
      date: new Date('2025-03-21'),
      time: '06:00',
      content:
        'Monday: Upper body, Tuesday: Lower body, Wednesday: Cardio, Thursday: Rest, Friday: Full body.',
      tags: [
        { id: 't7', name: 'Fitness', color: '#f44336', userId: 'user1' },
        { id: 't8', name: 'Health', color: '#8bc34a', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '6',
      title: 'Birthday Gift Ideas',
      date: new Date('2025-03-05'),
      time: '14:20',
      content:
        'For Mom: Scarf, cookbook, or spa voucher. For Dad: Watch, tech gadget, or hiking gear.',
      tags: [
        { id: 't3', name: 'Personal', color: '#4caf50', userId: 'user1' },
        { id: 't9', name: 'Family', color: '#ff9800', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '7',
      title: 'Learning Goals',
      date: new Date('2025-03-12'),
      time: '08:40',
      content:
        'Complete Angular course, learn about web architecture patterns, practice TypeScript daily.',
      tags: [
        { id: 't10', name: 'Learning', color: '#03a9f4', userId: 'user1' },
        { id: 't4', name: 'Ideas', color: '#2196f3', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '8',
      title: 'Travel Plans',
      date: new Date('2025-03-25'),
      time: '16:50',
      content:
        'Research destinations: Barcelona, Tokyo, New York. Check flight prices and accommodations.',
      tags: [
        { id: 't11', name: 'Travel', color: '#673ab7', userId: 'user1' },
        { id: 't12', name: 'Planning', color: '#009688', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '9',
      title: 'Recipe: Pasta Carbonara',
      date: new Date('2025-03-17'),
      time: '18:30',
      content:
        'Ingredients: spaghetti, eggs, pancetta, parmesan cheese, black pepper. Cook pasta, mix eggs with cheese, combine with hot pasta.',
      tags: [
        { id: 't13', name: 'Cooking', color: '#ff5722', userId: 'user1' },
        { id: 't14', name: 'Recipes', color: '#cddc39', userId: 'user1' },
      ],
      userId: 'user1',
    },
    {
      id: '10',
      title: 'Weekly Reflection',
      date: new Date('2025-03-19'),
      time: '21:00',
      content:
        'Accomplishments: completed project milestone, started morning routine. Challenges: time management, focus during meetings.',
      tags: [
        { id: 't15', name: 'Reflection', color: '#607d8b', userId: 'user1' },
        {
          id: 't16',
          name: 'Personal Growth',
          color: '#9e9e9e',
          userId: 'user1',
        },
        {
          id: 't16',
          name: 'Personal Growth',
          color: '#9e9e9e',
          userId: 'user1',
        },
      ],
      userId: 'user1',
    },
  ];

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
    this.selected = this.notes[0]
    this.tempContent = this.notes[0].content
    this.tempTitle = this.notes[0].title
  }

  preview(note : Note) {
    this.selected = note
    this.tempContent = note.content 
    this.tempTitle = note.title   
  }
  
  undo(){
    this.tempTitle = this.selected.title   
    this.tempContent = this.selected.content  
  }
  
  // ...existing methods
  
  // Example of how to use the loader:
  update() {
    this.isLoading = true;
    this.fullscreen = true;
    
    // Simulate an API call
    setTimeout(() => {
      // Update the note
      // this.selected.title = this.tempTitle;
      // this.selected.content = this.tempContent;
      
      // End loading state
      this.fullscreen = false;
      this.isLoading = false;
    }, 2000);
  }

}
