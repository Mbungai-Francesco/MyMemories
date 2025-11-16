import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { LucideAngularModule, SquarePen, Trash2 } from 'lucide-angular';
import { JwtService } from '../../../services/jwt/jwt.service';
import { deleteTag } from '../../../api/tagsApi';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.css',
})
export class TagComponent {
  @Input() id: string = '';
  @Input() name: string = '';
  @Input({ required: true }) color: string = '';
  @Output() deleted = new EventEmitter<void>();

  jwt = '';

  constructor(private jwtService: JwtService) {
    jwtService.jwt$.subscribe((jwt) => {
      this.jwt = jwt;
    });
  }

  readonly icons = { Trash2, SquarePen };

  delete() {
    deleteTag(this.id, this.jwt).then((res) => {
      console.log(res);
      this.deleted.emit();
    });
  }

  update() {
    
  }
}
