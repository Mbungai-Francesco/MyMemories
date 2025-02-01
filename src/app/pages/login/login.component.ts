import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/shared/button/button.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ButtonComponent ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
}
