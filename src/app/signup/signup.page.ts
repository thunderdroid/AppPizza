import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';  // Importar Firebase Auth
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular'; // Importar AlertController y LoadingController

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'], // Usar estilo del login
})
export class SignupPage implements OnInit {
  signupForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private afAuth: AngularFireAuth, // Firebase Auth
    private router: Router,
    private alertController: AlertController, // Para mostrar alertas
    private loadingController: LoadingController // Para mostrar carga
  ) {
    // Inicializar el formulario con validaciones
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$')]],
      phone: ['', [Validators.required, Validators.pattern('9[0-9]{8}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/)
      ]]
    });
  }

  ngOnInit() {}

  // Validar que el nombre solo tenga letras
  validateName(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1 ]/g, ''); 
  }

  // Validar que el teléfono solo tenga números
  validatePhone(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); 
  }

  // Función para registrar el usuario
  async onSubmit() {
    if (this.signupForm.valid) {
      const { email, password } = this.signupForm.value;

      // Mostrar carga antes de crear la cuenta
      const loading = await this.loadingController.create({
        message: 'Creando cuenta...',
        spinner: 'crescent',
      });
      await loading.present(); // Muestra el spinner

      // Llamar a la función de creación de cuenta
      await this.createAccount(email, password, loading);
    } else {
      // Marcar todos los campos como tocados para mostrar los mensajes de error
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control) {
          control.markAsTouched();
        }
      });
    }
  }

  async createAccount(email: string, password: string, loading: HTMLIonLoadingElement) {
    this.isLoading = true; // Cambia el estado de carga

    try {
      // Crear cuenta en Firebase Authentication
      await this.afAuth.createUserWithEmailAndPassword(email, password);

      // Mostrar alerta de registro exitoso
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Tu cuenta ha sido creada exitosamente.',
        buttons: [{
          text: 'OK',
          handler: async () => {
            // Redirigir a la página de menú
            this.router.navigate(['/menu']);
          }
        }]
      });

      await alert.present(); // Presentar la alerta
    } catch (error) {
      console.error('Error al crear la cuenta', error);
      
      // Mostrar alerta de error
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No se pudo crear la cuenta. Por favor intenta de nuevo.',
        buttons: ['OK']
      });
      await alert.present(); // Presentar la alerta en caso de error
    } finally {
      await loading.dismiss(); // Asegúrate de que el loading se oculta
      this.isLoading = false; // Resetea el estado del loading
    }
  }
}
