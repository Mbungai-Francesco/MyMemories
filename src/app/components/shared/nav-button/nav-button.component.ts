import { Component, Inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, PlusCircle, X } from 'lucide-angular';
import { WINDOW } from '../../../app.config';

@Component({
  selector: 'app-nav-button',
  standalone: true,
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './nav-button.component.html',
  styleUrl: './nav-button.component.css'
})
export class NavButtonComponent {
  @Input() icon : any
  @Input() link !: string
  @Input({required: true}) text !: string

  constructor(
    @Inject(WINDOW) private window: Window,
  ){}

  checkRoute = () =>{
    let val = this.window.location.pathname.split('/')[1]
    if(val == this.link) return true
    return false
  }
}
