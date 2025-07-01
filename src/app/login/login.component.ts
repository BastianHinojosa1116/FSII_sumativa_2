import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/index']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
