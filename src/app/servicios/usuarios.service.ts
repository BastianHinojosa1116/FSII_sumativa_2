import { Injectable } from '@angular/core';

export interface Usuario {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  correo: string;
  fechaNacimiento:string;
  contrasena: string;
  direccion?: string; 
  perfil: string;
  editable:boolean;
  foto?: string;
}

@Injectable({ providedIn: 'root' })
export class UsuariosService {
  private key = 'users';

  constructor() {
   
  }

  private inicializarAdmin(): void {
    const data = localStorage.getItem(this.key);
    const users: Usuario[] = data ? JSON.parse(data) : [];

    const existeAdmin = users.some(
      u => u.correo?.trim().toLowerCase() === 'ba.hinojosa@duocuc.cl'
    );

    if (!existeAdmin) {
     users.push({
  nombre: 'Bastián',
  apellido: 'Hinojosa',
  nombreUsuario: 'ba.hinojosa',
  correo: 'ba.hinojosa@duocuc.cl',
  fechaNacimiento: '1990-01-01',
  contrasena: '1Duoc*!',
  direccion: 'Oficina Central',
  foto: 'assets/images/nofoto.png',
  perfil: 'Administrador',
  editable: false
});

      this.setUsuarios(users);
    }
  }

  getUsuarios(): Usuario[] {
  const data = localStorage.getItem(this.key);
  return data ? JSON.parse(data) : [];
}

setUsuarios(users: Usuario[]): void {
  localStorage.setItem(this.key, JSON.stringify(users));
}
}