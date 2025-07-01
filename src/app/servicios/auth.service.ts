import { Injectable } from '@angular/core';

export interface User {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  correo: string;
  fechaNacimiento: string;
  contrasena: string;
  direccion?: string;
  perfil: string;
  editable: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';
  private sessionKey = 'currentUser';

  getUsers(): User[] {
  const raw = localStorage.getItem(this.storageKey);
  const users: User[] = raw ? JSON.parse(raw) : [];

  const existeAdmin = users.some(u => u.correo === 'ba.hinojosa@duocuc.cl');

  // Solo agregar el admin si no existe, pero sin borrar usuarios existentes
  if (!existeAdmin) {
    const admin: User = {
      nombre: 'Bastian',
      apellido: 'Hinojosa',
      nombreUsuario: 'ba.hinojosa',
      correo: 'ba.hinojosa@duocuc.cl',
      fechaNacimiento: '1990-01-01',
      direccion: 'Oficina Central',
      contrasena: '1Duoc*!',
      perfil: 'administrador',
      editable: true
    };
    users.push(admin);
    localStorage.setItem(this.storageKey, JSON.stringify(users)); // ✅ OK: mantiene el array actual
  }

  return users;
}

  isEmailTaken(email: string): boolean {
    return this.getUsers().some(u => u.correo === email);
  }

  register(user: User): boolean {
    const users = this.getUsers();
    if (this.isEmailTaken(user.correo)) return false;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const found = this.getUsers().find(
      u => u.correo === email && u.contrasena === password
    );
    if (found) {
      localStorage.setItem(this.sessionKey, JSON.stringify(found));
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }

  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
  }

  setUsuarios(users: User[]) {
  localStorage.setItem(this.storageKey, JSON.stringify(users));
}
}
