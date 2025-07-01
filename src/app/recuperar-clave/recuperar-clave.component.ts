import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrls: ['./recuperar-clave.component.css']
})
export class RecuperarClaveComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      clave1: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?=.*[A-Z])(?=.*\d)(?=.*\W)/)
      ]],
      clave2: ['']
    }, {
      validators: this.passwordsMatch
    });
  }

  passwordsMatch(group: AbstractControl) {
    const pass = group.get('clave1')?.value;
    const confirm = group.get('clave2')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

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
    this.auth.setUsuarios(usuarios); // Asegúrate de tener este método en AuthService

    alert('Contraseña actualizada correctamente.');
    this.router.navigate(['']);
  }
}
