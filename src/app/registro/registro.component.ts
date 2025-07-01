import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';

@Component({
  selector: 'app-registro',                     
  templateUrl: './registro.component.html',     
  styleUrls: ['./registro.component.css']       
})
export class RegistroComponent implements OnInit {
  registroForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

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
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*\W)/)
      ]],
      confirmarContrasena: ['']
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(fg: FormGroup) {
    const pw = fg.get('contrasena')?.value;
    const cpw = fg.get('confirmarContrasena')?.value;
    return pw === cpw ? null : { passwordsMismatch: true };
  }

  get f() { return this.registroForm.controls; }

  onSubmit() {
  this.submitted = true;

  // 1) Validación del formulario
  if (this.registroForm.invalid) return;

  // 2) Separar confirmación de contraseña y añadir perfil por defecto
  const { confirmarContrasena, ...userData } = this.registroForm.value;
  const nuevoUsuario: User = {
    ...userData,
    perfil: 'Usuario'  // <-- Aquí asignas el rol por defecto
  };

  // 3) Intentar registrar
  const ok = this.auth.register(nuevoUsuario);
  if (!ok) {
    this.registroForm
      .get('correo')
      ?.setErrors({ emailTaken: true });
    return;
  }

  // 4) Registro exitoso → redirigir
  alert('Registro exitoso. Ahora inicia sesión.');
  this.router.navigate(['']);
}


  onReset() {
    this.submitted = false;
    this.registroForm.reset();
  }
}