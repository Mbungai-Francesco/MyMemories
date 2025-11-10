import { Component, ElementRef, EventEmitter, Output, ViewChild, viewChild } from '@angular/core';
import { PopCardComponent } from '../pop-card/pop-card.component';
import { Color, TagDto } from '../../../types';
import { createTag } from '../../../api/tagsApi';
import { JwtService } from '../../../services/jwt/jwt.service';
import { FormsModule } from '@angular/forms';
import { getColors } from '../../../api/colorsApi';

@Component({
  selector: 'app-create-tag',
  standalone: true,
  imports: [PopCardComponent, FormsModule],
  templateUrl: './create-tag.component.html',
  styleUrl: './create-tag.component.css',
})
export class CreateTagComponent {
  @Output() closeTag = new EventEmitter<void>();
  @Output() refetchTags = new EventEmitter<string>();
  @ViewChild('myTag') myTag!: ElementRef;

  name = '';
  color = '';
  description = '';

  jwt = '';
  colors: Color[] = [];

  constructor(private jwtService: JwtService) {
    jwtService.jwt$.subscribe((jwt) => {
      this.jwt = jwt;
    });
    getColors().then(res =>{
      this.colors = res
    })
  }

  close(){
    this.closeTag.emit();
  }
  
  changeColor(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.color = selectElement.value;
    this.myTag.nativeElement.style.color = this.color;
  }

  create() {
    if (this.name && this.color) {
      const newTag: TagDto = {
        name: this.name,
        color: this.color,
        description: this.description,
        userId: this.jwtService.getId(),
      };
      createTag(newTag, this.jwt).then((res) => {
        this.refetchTags.emit(this.jwt);
        this.closeTag.emit();
        this.name = '';
        this.color = '';
        this.description = '';
      });
    }
  }

}
