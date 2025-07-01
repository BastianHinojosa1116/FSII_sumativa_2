import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

/**
 * Componente para la recuperación y cambio de contraseña.
 * Permite ingresar correo y nueva clave con validación y confirmación.
 */
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {
  /** Formulario reactivo para recuperación de contraseña */
  form!: FormGroup;

  /**
   * Constructor que inyecta servicios necesarios para formularios, autenticación y navegación.
   * @param fb FormBuilder para construir el formulario reactivo
   * @param auth Servicio de autenticación para manejo de usuarios
   * @param router Servicio para navegar entre rutas
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializa el formulario con validaciones al iniciar el componente.
   */
  ngOnInit() {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave1: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*\W)/) // al menos una mayúscula, un número y un símbolo
      ]],
      clave2: ['']
    }, {
      validators: this.passwordsMatch
    });
  }

  /**
   * Validador personalizado que verifica que las dos contraseñas coincidan.
   * @param group Control abstracto del formulario
   * @returns null si coinciden, objeto con error si no
   */
  passwordsMatch(group: AbstractControl) {
    const pass = group.get('clave1')?.value;
    const confirm = group.get('clave2')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  /**
   * Maneja el envío del formulario para actualizar la contraseña.
   * Valida, busca el usuario y actualiza la contraseña en el servicio.
   * Navega a la página principal luego de éxito o alerta en caso de error.
   */
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { correo, clave1 } = this.form.value;
    const usuarios: User[] = this.auth.getUsers();
    const index = usuarios.findIndex(u => u.correo.trim().toLowerCase() === correo.trim().toLowerCase());

    if (index === -1) {
      alert('No existe un usuario con ese correo.');
      return;
    }

    usuarios[index].contrasena = clave1;
    this.auth.setUsuarios(usuarios);

    alert('Contraseña actualizada correctamente.');
    this.router.navigate(['']);
  }
}
