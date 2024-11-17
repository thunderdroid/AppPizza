import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service'; // Ajusta la ruta según tu estructura
import { RoleService } from '../services/role.service'; // Asegúrate de importar el servicio para roles

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  userName: string | null = null; // Para almacenar el nombre del usuario
  isAdmin: boolean = false; // Indica si el usuario es administrador

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private authService: AuthService,
    private roleService: RoleService // Inyectamos el servicio de roles
  ) {}

  ngOnInit() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userName = user.displayName || user.email; // Usar displayName o email si no hay displayName
        this.checkAdminRole(user); // Verificar si el usuario tiene rol de administrador
      } else {
        this.router.navigate(['/login']); // Redirigir a login si no está autenticado
      }
    });
  }

  async checkAdminRole(user: any) {
    // Verifica si el usuario tiene el rol 'admin' asignado
    const userRef = this.firestore.collection('users').doc(user.uid);
    userRef.get().subscribe((doc) => {
      if (doc.exists) {
        const userData = doc.data() as { role?: string }; // Especificamos el tipo de dato con un campo opcional "role"
        if (userData.role === 'admin') {
          this.isAdmin = true; // Si tiene el rol admin, lo establecemos en true
        }
      }
    });

   
  }

  // Método para cerrar sesión
  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']); // Redirigir a la página de login
  }
}
