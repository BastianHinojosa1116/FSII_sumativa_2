import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  mostrarNavbar = true;


  title = 'sumativa_2';
 logout(): void {
  localStorage.removeItem('currentUser'); // ✔️ solo cierra la sesión
  this.router.navigate(['']);
}


  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const ruta = event.urlAfterRedirects;
        this.mostrarNavbar = !['/', '/login', '', '/registro','/recuperar-clave'].includes(ruta);
      }
    });
  }
}

