import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu estructura

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string | null = null; // Para almacenar el nombre del usuario

  constructor(private afAuth: AngularFireAuth, private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email; // Usar displayName o email si no hay displayName
      } else {
        this.router.navigate(['/login']); // Redirigir a login si no está autenticado
      }
    });
  }

  // Método para cerrar sesión
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}


