import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

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
