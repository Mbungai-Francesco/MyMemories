import { Component } from '@angular/core';
import { LucideAngularModule, Notebook, PlusCircle, Settings, X } from 'lucide-angular';
import { NavButtonComponent } from "../nav-button/nav-button.component";


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [LucideAngularModule, NavButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  readonly icons = { X, PlusCircle, Notebook, Settings }
}
