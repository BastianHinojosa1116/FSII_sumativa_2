import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';

/**
 * Componente que representa la página principal después del login,
 * mostrando funcionalidades según el perfil del usuario.
 */
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  /** Perfil del usuario actual, usado para mostrar opciones específicas */
  perfil: string | null = null;

  /**
   * Constructor que inyecta servicios necesarios.
   * @param router Servicio para navegar entre rutas
   * @param auth Servicio de autenticación para obtener datos del usuario
   */
  constructor(private router: Router, private auth: AuthService) {}

  /**
   * Método del ciclo de vida Angular que se ejecuta al iniciar el componente.
   * Obtiene el perfil del usuario actual para uso interno.
   */
  ngOnInit(): void {
    const usuario = this.auth.getCurrentUser();
    this.perfil = usuario?.perfil || null;
  }

  /**
   * Cierra sesión limpiando el localStorage y redirigiendo a la página de login.
   */
  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
