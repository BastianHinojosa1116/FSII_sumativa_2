import { Component, OnInit } from '@angular/core';
import { UsuariosService, Usuario } from '../servicios/usuarios.service';
import { AuthService, User } from '../servicios/auth.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];

  constructor(
  private auth: AuthService,
  private servicio: UsuariosService // 
) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
  this.usuarios = this.auth.getUsers().map(user => ({
    ...user,
    editable: user.editable ?? true // si editable está ausente, lo pone en true
  }));
}

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

  cambiarPerfil(usuario: Usuario, nuevoPerfil: string) {
    if (usuario.correo === 'ba.hinojosa@duoc.cl') return;
    usuario.perfil = nuevoPerfil;
    this.servicio.setUsuarios(this.usuarios);
    this.cargarUsuarios();
  }
}
