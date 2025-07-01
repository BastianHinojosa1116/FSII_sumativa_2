import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Componente raíz de la aplicación.
 * Controla la visibilidad de la barra de navegación según la ruta actual
 * y maneja la funcionalidad de cierre de sesión.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /** Controla si la barra de navegación debe mostrarse */
  mostrarNavbar = true;

  /** Título de la aplicación */
  title = 'sumativa_2';

  /**
   * Constructor que inyecta el Router y configura la suscripción a eventos de navegación
   * para actualizar la visibilidad de la navbar.
   * @param router Instancia del enrutador para controlar la navegación
   */
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ruta = event.urlAfterRedirects;
        // Oculta navbar en rutas específicas como login, registro, recuperación de clave
        this.mostrarNavbar = !['/', '/login', '', '/registro', '/recuperar-clave'].includes(ruta);
      }
    });
  }

  /**
   * Cierra la sesión del usuario eliminando la información del localStorage
   * y redirigiendo a la página principal.
   */
  logout(): void {
    localStorage.removeItem('currentUser'); // Solo cierra la sesión
    this.router.navigate(['']);
  }
}
