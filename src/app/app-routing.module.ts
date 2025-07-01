import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';
import { RegistroComponent } from './registro/registro.component';
import { InventarioComponent } from './inventario/inventario.component';
import { ReportesComponent } from './reportes/reportes.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'registro', component : RegistroComponent},
  { path: 'inventario', component : InventarioComponent},
  { path: 'reportes', component : ReportesComponent},
  { path: 'usuarios', component : UsuariosComponent},
  { path: 'recuperar-clave', component : RecuperarClaveComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
