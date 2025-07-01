import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';

/**
 * Componente para el registro de nuevos usuarios.
 * Maneja formulario reactivo con validaciones, registro y redirección.
 */
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  /** Formulario reactivo para el registro de usuario */
  registroForm!: FormGroup;

  /** Indica si el formulario ha sido enviado (para mostrar errores) */
  submitted = false;

  /**
   * Constructor que inyecta servicios para formularios, autenticación y navegación.
   * @param fb FormBuilder para construir el formulario
   * @param auth Servicio de autenticación para registrar usuarios
   * @param router Servicio para navegación entre rutas
   */
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  /**
   * Inicializa el formulario reactivo con validaciones al iniciar el componente.
   */
  ngOnInit() {
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      nombreUsuario: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      fechaNacimiento: ['', Validators.required],
      direccion: [''],
      contrasena: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*\W)/) // mayúscula, número y símbolo
      ]],
      confirmarContrasena: ['']
    }, {
      validators: this.passwordsMatch
    });
  }

  /**
   * Validador personalizado que verifica que las contraseñas coincidan.
   * @param fg Grupo de controles del formulario
   * @returns null si coinciden, error si no
   */
  passwordsMatch(fg: FormGroup) {
    const pw = fg.get('contrasena')?.value;
    const cpw = fg.get('confirmarContrasena')?.value;
    return pw === cpw ? null : { passwordsMismatch: true };
  }

  /**
   * Getter para facilitar el acceso a los controles del formulario.
   */
  get f() { 
    return this.registroForm.controls; 
  }

  /**
   * Maneja el envío del formulario de registro.
   * Valida, registra el usuario y redirige en caso de éxito.
   */
  onSubmit() {
    this.submitted = true;

    // Validar formulario
    if (this.registroForm.invalid) return;

    // Extraer y preparar datos para registro
    const { confirmarContrasena, ...userData } = this.registroForm.value;
    const nuevoUsuario: User = {
      ...userData,
      perfil: 'Usuario' // rol por defecto
    };

    // Intentar registrar usuario
    const ok = this.auth.register(nuevoUsuario);
    if (!ok) {
      this.registroForm
        .get('correo')
        ?.setErrors({ emailTaken: true });
      return;
    }

    // Éxito: mostrar mensaje y redirigir
    alert('Registro exitoso. Ahora inicia sesión.');
    this.router.navigate(['']);
  }

  /**
   * Resetea el formulario y el estado de envío.
   */
  onReset() {
    this.submitted = false;
    this.registroForm.reset();
  }
}
