import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular'; 

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup;
  isLoading = false; // Variable de estado para controlar la pantalla de carga

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router, 
    private alertController: AlertController,
    private loadingController: LoadingController // Loading controller para manejar la pantalla de carga
  ) {
    this.signupForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern('^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$')]],
      phone: ['', [Validators.required, Validators.pattern('9[0-9]{8}')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(10), Validators.pattern('(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{10,20}')]]
    });
  }

  ngOnInit() {}

  validateName(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^a-zA-ZÀ-ÿ\u00f1\u00d1 ]/g, ''); 
  }

  validatePhone(event: any) {
    const input = event.target.value;
    event.target.value = input.replace(/[^0-9]/g, ''); 
  }

  async onSubmit() {
    if (this.signupForm.valid) {
      const alert = await this.alertController.create({
        header: 'Registro exitoso',
        message: 'Tu registro se ha completado exitosamente.',
        buttons: [{
          text: 'OK',
          handler: async () => {
            await this.showLoading(); 
          }
        }]
      });

      await alert.present();
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
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
      spinner: "circles", 
    });

    await loading.present();

    
    setTimeout(async () => {
      this.isLoading = false; 
      await loading.dismiss(); 
      this.router.navigate(['/menu']); 
    }, 3000); 
  }
}
