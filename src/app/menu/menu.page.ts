import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { CartPage } from '../cart/cart.page'; // Asegúrate de que este sea el nombre correcto de la página del carrito

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  cart: { name: string; image: string; price: number }[] = [];

  constructor(private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    // Inicializa el carrito si es necesario
  }

  onSegmentChange(event: any) {
    const selectedValue = event.detail.value;

    switch (selectedValue) {
      case 'pizzas':
        this.router.navigate(['/pizzas']);
        break;
      case 'bebidas':
        this.router.navigate(['/bebidas']);
        break;
      case 'acompanamientos':
        this.router.navigate(['/acompanamientos']);
        break;
      default:
        break;
    }
  }

  // Función para agregar productos al carrito
  addToCart(name: string, image: string, price: number) {
    const product = { name, image, price };
    this.cart.push(product);
    console.log(`${name} ha sido agregado al carrito`); // Para ver si funciona
  }

  // Función para abrir el carrito
  async openCart() {
    const modal = await this.modalController.create({
      component: CartPage, // Asegúrate de que este sea el componente correcto
      componentProps: { cart: this.cart } // Pasa el carrito como props
    });
    return await modal.present();
  }

  // Función para cerrar el carrito
  closeCart() {
    this.modalController.dismiss().then(() => {
      console.log('Modal cerrado');
    }).catch(error => {
      console.error('Error al cerrar el modal:', error);
    });
  }
}
