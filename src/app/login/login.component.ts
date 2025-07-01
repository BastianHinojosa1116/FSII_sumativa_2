import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../servicios/auth.service';

/**
 * Componente para el formulario de inicio de sesión.
 * Permite ingresar email y contraseña para autenticarse.
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  /** Correo electrónico ingresado por el usuario */
  email = '';

  /** Contraseña ingresada por el usuario */
  password = '';

  /**
   * Constructor que inyecta servicios de autenticación y navegación.
   * @param auth Servicio de autenticación para validar credenciales
   * @param router Servicio para navegación entre rutas
   */
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Maneja el envío del formulario de login.
   * Intenta autenticar con las credenciales ingresadas.
   * Si son válidas, redirige a la página principal.
   * Si no, muestra alerta de error.
   */
  onSubmit() {
    if (this.auth.login(this.email, this.password)) {
      this.router.navigate(['/index']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
