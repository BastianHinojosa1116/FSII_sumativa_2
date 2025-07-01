import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../servicios/usuarios.service';
import { AuthService, User } from '../servicios/auth.service';

/**
 * Componente para gestionar usuarios.
 * Permite cargar, agregar, editar, eliminar usuarios y cambiar perfiles.
 */
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  /** Lista de usuarios cargados para mostrar y editar */
  usuarios: Usuario[] = [];

  /**
   * Constructor que inyecta servicios de autenticación y usuarios.
   * @param auth Servicio para autenticación y acceso a usuarios
   * @param servicio Servicio para manejo persistente de usuarios
   */
  constructor(
    private auth: AuthService,
    private servicio: UsuariosService
  ) {}

  /**
   * Ciclo de vida que se ejecuta al inicializar el componente.
   * Carga la lista de usuarios.
   */
  ngOnInit(): void {
    this.cargarUsuarios();
  }

  /**
   * Carga los usuarios desde el servicio y asegura que tengan la propiedad 'editable'.
   */
  cargarUsuarios() {
    this.usuarios = this.auth.getUsers().map(user => ({
      ...user,
      editable: user.editable ?? true // Si no tiene editable, por defecto true
    }));
  }

  /**
   * Permite agregar un nuevo usuario solicitando datos mediante prompts.
   * Valida datos obligatorios y evita correos duplicados.
   * Asigna perfil 'Administrador' al correo principal.
   */
  agregarUsuario() {
    const nombre = prompt('Nombre:');
    const apellido = prompt('Apellido:');
    const correo = prompt('Correo electrónico:');
    const contrasena = prompt('Contraseña:');
    const foto = prompt('URL de la foto (opcional):');
    const direccion = prompt('Dirección (opcional):');
    const fechaNacimiento = prompt('Fecha de nacimiento (YYYY-MM-DD):');

    if (!nombre || !apellido || !correo || !contrasena || !fechaNacimiento) {
      alert('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const normalizado = correo.trim().toLowerCase();
    if (this.usuarios.some(u => u.correo.trim().toLowerCase() === normalizado)) {
      alert('Ya existe un usuario con ese correo.');
      return;
    }

    const perfil = normalizado === 'ba.hinojosa@duoc.cl' ? 'Administrador' : 'Usuario';

    const nuevoUsuario: Usuario = {
      nombre,
      apellido,
      nombreUsuario: correo.split('@')[0],
      correo: normalizado,
      fechaNacimiento,
      contrasena,
      direccion: direccion || '',
      foto: foto || 'assets/images/nofoto.png',
      perfil,
      editable: true
    };

    this.usuarios.push(nuevoUsuario);
    this.servicio.setUsuarios(this.usuarios);
    this.cargarUsuarios();
  }

  /**
   * Permite editar un usuario existente mediante prompts.
   * Valida campos obligatorios, evita duplicados y protege al administrador principal.
   * @param index Índice del usuario a editar en la lista
   */
  editar(index: number) {
    const u = this.usuarios[index];

    if (!u.editable) {
      alert('Este usuario no puede ser editado.');
      return;
    }

    const nombre = prompt('Nuevo nombre:', u.nombre);
    const apellido = prompt('Nuevo apellido:', u.apellido);
    const correo = prompt('Nuevo correo:', u.correo);
    const contrasena = prompt('Nueva contraseña:', u.contrasena);
    const foto = prompt('Nueva URL de foto:', u.foto);
    const direccion = prompt('Nueva dirección:', u.direccion);
    const fechaNacimiento = prompt('Nueva fecha de nacimiento:', u.fechaNacimiento);

    if (!nombre || !apellido || !correo || !contrasena || !fechaNacimiento) {
      alert('Todos los campos obligatorios deben estar completos.');
      return;
    }

    const normalizado = correo.trim().toLowerCase();

    if (u.correo === 'ba.hinojosa@duoc.cl' && normalizado !== u.correo) {
      alert('No puedes modificar el correo del administrador principal.');
      return;
    }

    if (this.usuarios.some((x, i) => x.correo.trim().toLowerCase() === normalizado && i !== index)) {
      alert('Ya existe otro usuario con ese correo.');
      return;
    }

    const perfil = normalizado === 'ba.hinojosa@duoc.cl' ? 'Administrador' : u.perfil;

    this.usuarios[index] = {
      ...u,
      nombre,
      apellido,
      nombreUsuario: normalizado.split('@')[0],
      correo: normalizado,
      contrasena,
      direccion: direccion || '',
      fechaNacimiento,
      foto: foto || 'assets/images/nofoto.png',
      perfil
    };

    this.servicio.setUsuarios(this.usuarios);
    this.cargarUsuarios();
  }

  /**
   * Elimina un usuario, previa confirmación y protegiendo al administrador principal.
   * @param index Índice del usuario a eliminar en la lista
   */
  eliminar(index: number) {
    const u = this.usuarios[index];
    if (u.correo === 'ba.hinojosa@duoc.cl') {
      alert('No puedes eliminar al administrador principal.');
      return;
    }

    if (confirm(`¿Eliminar a ${u.nombre}?`)) {
      this.usuarios.splice(index, 1);
      this.servicio.setUsuarios(this.usuarios);
      this.cargarUsuarios();
    }
  }

  /**
   * Cambia el perfil de un usuario excepto si es el administrador principal.
   * Actualiza los usuarios persistidos y recarga la lista.
   * @param usuario Usuario al que se cambiará el perfil
   * @param nuevoPerfil Nuevo perfil a asignar
   */
  cambiarPerfil(usuario: Usuario, nuevoPerfil: string) {
    if (usuario.correo === 'ba.hinojosa@duoc.cl') return;
    usuario.perfil = nuevoPerfil;
    this.servicio.setUsuarios(this.usuarios);
    this.cargarUsuarios();
  }
}
