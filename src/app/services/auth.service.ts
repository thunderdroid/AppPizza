import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método para cerrar sesión
  async logout() {
    try {
      await this.afAuth.signOut();
      // Limpiar datos almacenados si es necesario
      this.clearStoredUser(); // Limpia los datos del usuario al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  // Guardar datos del usuario en local storage
  setStoredUser(email: string, password: string) {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
  }

  // Obtener datos del usuario desde local storage
  getStoredUser() {
    const email = localStorage.getItem('userEmail');
    const password = localStorage.getItem('userPassword');
    return { email, password }; // Devuelve un objeto
  }

  // Limpiar datos del usuario
  clearStoredUser() {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}
