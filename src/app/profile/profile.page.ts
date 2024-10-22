import { Component, OnInit, HostListener } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string | null = null; // Para almacenar el nombre del usuario

  constructor(private afAuth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email; // Usar displayName o email si no hay displayName
      } else {
        this.router.navigate(['/login']); // Redirigir a login si no está autenticado
      }
    });
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    console.log('Clicked:', event); // Para verificar el evento de clic
  }

  async signOut() {
    console.log('Intentando cerrar sesión'); // Mensaje de prueba
    await this.afAuth.signOut();
    this.router.navigate(['/login']); // Redirigir a la página de inicio de sesión
  }
}

