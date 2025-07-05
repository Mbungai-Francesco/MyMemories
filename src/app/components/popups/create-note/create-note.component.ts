import { Component, Input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Tag } from '../../../types';
@Component({
  selector: 'app-create-note',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-note.component.html',
  styleUrl: './create-note.component.css',
})
export class CreateNoteComponent {
  createForm!: FormGroup;
  invalidCredentials = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(){
    this.createForm = this.fb.group({
      title: ['', [Validators.required, Validators.min(3)]],
      tags: [[],],
    });
  }

  create(){
    const val = this.createForm.value
    if(this.createForm.valid){
      const title = val.title as string
      const tags = val.tags as Tag[]
      console.log(title,tags)
    }
  }
}
