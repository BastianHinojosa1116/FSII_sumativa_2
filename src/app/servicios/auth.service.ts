import { Injectable } from '@angular/core';

/**
 * Interfaz que representa a un usuario del sistema.
 */
export interface User {
  /** Nombre del usuario */
  nombre: string;

  /** Apellido del usuario */
  apellido: string;

  /** Nombre de usuario para login */
  nombreUsuario: string;

  /** Correo electrónico */
  correo: string;

  /** Fecha de nacimiento en formato YYYY-MM-DD */
  fechaNacimiento: string;

  /** Contraseña del usuario */
  contrasena: string;

  /** Dirección (opcional) */
  direccion?: string;

  /** Perfil o rol asignado */
  perfil: string;

  /** Indica si el usuario puede ser editado */
  editable: boolean;
}

/**
 * Servicio de autenticación que gestiona usuarios en localStorage
 * incluyendo registro, inicio de sesión y manejo de sesión actual.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  private storageKey = 'users';
  private sessionKey = 'currentUser';

  /**
   * Obtiene la lista de usuarios desde localStorage.
   * Si no existe un administrador, lo crea automáticamente.
   * @returns {User[]} Lista de usuarios registrados
   */
  getUsers(): User[] {
    const raw = localStorage.getItem(this.storageKey);
    const users: User[] = raw ? JSON.parse(raw) : [];

    const existeAdmin = users.some(u => u.correo === 'ba.hinojosa@duocuc.cl');

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
      localStorage.setItem(this.storageKey, JSON.stringify(users));
    }
    return users;
  }

  /**
   * Verifica si el correo ya está registrado.
   * @param {string} email - Correo electrónico a verificar
   * @returns {boolean} true si el correo ya existe, false en caso contrario
   */
  isEmailTaken(email: string): boolean {
    return this.getUsers().some(u => u.correo === email);
  }

  /**
   * Registra un nuevo usuario si el correo no existe previamente.
   * @param {User} user - Usuario a registrar
   * @returns {boolean} true si el registro fue exitoso, false si el correo ya está tomado
   */
  register(user: User): boolean {
    const users = this.getUsers();
    if (this.isEmailTaken(user.correo)) return false;

    users.push(user);
    localStorage.setItem(this.storageKey, JSON.stringify(users));
    return true;
  }

  /**
   * Intenta iniciar sesión con correo y contraseña.
   * @param {string} email - Correo electrónico
   * @param {string} password - Contraseña
   * @returns {boolean} true si las credenciales son válidas, false en caso contrario
   */
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

  /**
   * Cierra la sesión actual, eliminando el usuario del almacenamiento.
   */
  logout(): void {
    localStorage.removeItem(this.sessionKey);
  }

  /**
   * Obtiene el usuario actualmente autenticado.
   * @returns {User | null} Usuario autenticado o null si no hay sesión
   */
  getCurrentUser(): User | null {
    return JSON.parse(localStorage.getItem(this.sessionKey) || 'null');
  }

  /**
   * Reemplaza la lista completa de usuarios.
   * @param {User[]} users - Lista de usuarios a guardar
   */
  setUsuarios(users: User[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(users));
  }
}
