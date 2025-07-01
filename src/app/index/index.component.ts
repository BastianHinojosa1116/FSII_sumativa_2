import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../servicios/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  perfil: string | null = null;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    const usuario = this.auth.getCurrentUser();
    this.perfil = usuario?.perfil || null;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}