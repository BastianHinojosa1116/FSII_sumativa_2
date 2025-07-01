import { TestBed } from '@angular/core/testing';
import { AuthService, User } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debería registrar un nuevo usuario si el correo no existe', () => {
    const user: User = {
  nombre: 'Ana',
  apellido: 'López',
  nombreUsuario: 'ana.lopez',
  correo: 'ana@example.com',
  fechaNacimiento: '1995-04-12',
  direccion: 'Calle Falsa 123',
  contrasena: 'secreto123',
  perfil: 'usuario',
  editable: true // 
    };
    const result = service.register(user);
    expect(result).toBeTrue();
  });

  it('no debería registrar si el correo ya existe', () => {
    const user: User = {
      nombre: 'Ana',
  apellido: 'López',
  nombreUsuario: 'ana.lopez',
  correo: 'ana@example.com',
  fechaNacimiento: '1995-04-12',
  direccion: 'Calle Falsa 123',
  contrasena: 'secreto123',
  perfil: 'usuario',
  editable: true // 
    };
    service.register(user);
    const resultado = service.register(user);
    expect(resultado).toBeFalse();
  });

  it('debería detectar si un correo ya está registrado', () => {
  service.register({
    nombre: 'Lucía',
    apellido: 'M.',
    nombreUsuario: 'lucia.m',
    correo: 'lucia@example.com',
    fechaNacimiento: '1992-03-15',
    direccion: 'Calle A',
    contrasena: 'segura456',
    perfil: 'usuario',
    editable: true
  });

  expect(service.isEmailTaken('lucia@example.com')).toBeTrue();
  expect(service.isEmailTaken('otro@example.com')).toBeFalse();
});

  it('debería iniciar sesión con credenciales válidas', () => {
  service.register({
    nombre: 'Pedro',
    apellido: 'Soto',
    nombreUsuario: 'pedro.s',
    correo: 'pedro@example.com',
    fechaNacimiento: '1990-06-20',
    direccion: 'Calle B',
    contrasena: '12345678',
    perfil: 'usuario',
    editable: true
  });

  const login = service.login('pedro@example.com', '12345678');
  expect(login).toBeTrue();
});

  it('no debería iniciar sesión con contraseña incorrecta', () => {
    service.register({
      nombre: 'Ana',
  apellido: 'López',
  nombreUsuario: 'ana.lopez',
  correo: 'ana@example.com',
  fechaNacimiento: '1995-04-12',
  direccion: 'Calle Falsa 123',
  contrasena: 'secreto123',
  perfil: 'usuario',
  editable: true // 
    });

    const login = service.login('maria@example.com', 'malaContraseña');
    expect(login).toBeFalse();
  });

  it('debería obtener el usuario actual después del login', () => {
    const user: User = {
     nombre: 'Ana',
  apellido: 'López',
  nombreUsuario: 'ana.lopez',
  correo: 'ana@example.com',
  fechaNacimiento: '1995-04-12',
  direccion: 'Calle Falsa 123',
  contrasena: 'secreto123',
  perfil: 'usuario',
  editable: true // 
    };
    service.register(user);
    service.login(user.correo, user.contrasena);

    const current = service.getCurrentUser();
    expect(current?.correo).toBe(user.correo);
  });

  it('debería eliminar el usuario actual al hacer logout', () => {
    service.login('ba.hinojosa@duocuc.cl', '1Duoc*!');
    service.logout();
    const current = service.getCurrentUser();
    expect(current).toBeNull();
  });
});
