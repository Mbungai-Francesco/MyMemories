import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css'
})
export class TagComponent {
  @Input() name : string = ''
  @Input() color : string = ''

  constructor() {  
  }
}
