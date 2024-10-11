import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'; 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['../login/login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  isLoading = false; 
  alertController: any;

  constructor(
    private formBuilder: FormBuilder, 
    private router: Router,
    private loadingController: LoadingController,
    private navCtrl: NavController,
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
    }, 1000);
  }

  
  async continueAsGuest() {
    await this.showLoading();
  }

  // flag para ingresar al inicio
  async ingresar() {
    var f = this.loginForm.value;

    var usuario = JSON.parse(localStorage.getItem('usuario'));

    if(usuario.correo == f.correo && usuario.password == f.password){
      console.log('Ingresado');
      localStorage.setItem('ingresado','true');
      this.navCtrl.navigateRoot('menu');
    }else{
      const alert = await this.alertController.create({
        header: 'Datos Incorrectos',
        message: 'Los datos que ingresaste estan incorrectos o vacios',
        button: ['Aceptar']
      });
    }
  }

  // flag para quitar el ingresado.
  async olvidar() {
    localStorage.removeItem("ingresado");
  }//
}


