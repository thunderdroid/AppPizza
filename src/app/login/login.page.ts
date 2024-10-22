import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service'; // Importar el servicio de autenticación
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup = this.fb.group({});
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    // Cargar datos almacenados localmente
    const storedUser = this.authService.getStoredUser();
    if (storedUser.email && storedUser.password) {
      this.loginForm.patchValue({
        email: storedUser.email,
        password: storedUser.password,
      });
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.showLoading(); // Mostrar cargando

        // Guardar datos en local storage
        this.authService.setStoredUser(email, password);

        // Redirigir al menú si el login es exitoso
        this.router.navigate(['/menu']);
      } catch (error) {
        console.error('Error al iniciar sesión', error);
      }
    } else {
      // Marcar los campos como "tocados" para mostrar los errores de validación
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  async showLoading() {
    this.isLoading = true;
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      spinner: 'circles',
    });

    await loading.present();

    // Simular tiempo de carga
    setTimeout(async () => {
      this.isLoading = false;
      await loading.dismiss(); // Cerrar el cargando
    }, 1000);
  }

  // Continuar como invitado
  async continueAsGuest() {
    await this.showLoading();
    this.router.navigate(['/menu']); // Redirigir al menú
  }
}
