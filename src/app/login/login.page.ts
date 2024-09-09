import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'; // Importar LoadingController

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoading = false; 

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

  async onSubmit() {
    if (this.loginForm.valid) {
      
      await this.showLoading();
    } else {
     
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
      spinner: "circles", 
    });

    await loading.present();

    
    setTimeout(async () => {
      this.isLoading = false;
      await loading.dismiss(); 
      this.router.navigate(['/menu']); 
    }, 3000);
  }

  
  async continueAsGuest() {
    await this.showLoading();
  }
}


