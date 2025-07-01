import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RegistroComponent } from './registro.component';
import { UsuariosService } from '../servicios/usuarios.service';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RegistroComponent],
      imports: [
        ReactiveFormsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [UsuariosService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('debería marcar el formulario como inválido si las contraseñas no coinciden', () => {
    component.registroForm.setValue({
      nombre: 'Ana',
      apellido: 'Lopez',
      nombreUsuario: 'analo',
      correo: 'ana@example.com',
      fechaNacimiento: '2000-01-01',
      direccion: '',
      contrasena: 'Clave123',
      confirmarContrasena: 'OtraClave123'
    });

    expect(component.registroForm.valid).toBeFalse();
    expect(component.registroForm.errors?.['passwordsMismatch']).toBeTrue();
  });
});
