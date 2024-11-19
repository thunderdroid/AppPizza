import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-success',
  templateUrl: './success.page.html',
  styleUrls: ['./success.page.scss'],
})
export class SuccessPage implements OnInit {
  orderId: string = '';


  constructor(private navController: NavController) { }

  ngOnInit() {
     // Obtener el ID del pedido desde el estado de la navegación
     const navigation = history.state;
     if (navigation && navigation.orderId) {
       this.orderId = navigation.orderId;
     }
  }

   // Función para navegar a la página principal
   goToHome() {
    this.navController.navigateRoot('/menu');
  }

}
