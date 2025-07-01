import { Injectable } from '@angular/core';

/**
 * Representa un usuario del sistema.
 * @interface Usuario
 */
export interface Usuario {
  /** Nombre del usuario */
  nombre: string;
  /** Apellido del usuario */
  apellido: string;
  /** Nombre de usuario (username) */
  nombreUsuario: string;
  /** Correo electrónico */
  correo: string;
  /** Fecha de nacimiento en formato ISO (YYYY-MM-DD) */
  fechaNacimiento: string;
  /** Contraseña del usuario */
  contrasena: string;
  /** Dirección del usuario (opcional) */
  direccion?: string;
  /** Perfil o rol del usuario (ejemplo: 'Administrador') */
  perfil: string;
  /** Indica si el usuario es editable */
  editable: boolean;
  /** Ruta a la foto del usuario (opcional) */
  foto?: string;
}

/**
 * Servicio para gestionar usuarios en localStorage.
 * Incluye método privado para inicializar un usuario administrador si no existe.
 */
@Injectable({ providedIn: 'root' })
export class UsuariosService {
  /**
   * Clave usada en localStorage para guardar los usuarios
   * @private
   */
  private key = 'users';

  constructor() {
    this.inicializarAdmin();
  }

  /**
   * Inicializa un usuario administrador si no existe en el almacenamiento.
   * @private
   */
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

  /**
   * Obtiene la lista de usuarios almacenados.
   * @returns {Usuario[]} Array con todos los usuarios registrados.
   */
  getUsuarios(): Usuario[] {
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }

  /**
   * Guarda la lista de usuarios en localStorage.
   * @param {Usuario[]} users - Array de usuarios a guardar.
   */
  setUsuarios(users: Usuario[]): void {
    localStorage.setItem(this.key, JSON.stringify(users));
  }
}
