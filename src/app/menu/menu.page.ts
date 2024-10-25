
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  selectedAddress: string = 'Agregar dirección';
  
  constructor(
    private router: Router,
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {}

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

  async openLocationModal() {
    const modal = await this.modalController.create({
      component: LocationModalComponent,
      cssClass: 'my-custom-class',
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.selectedAddress = data;// Actualiza el texto con la dirección seleccionada
    }
  }

  // Agrega productos al carrito usando el cartservice
  addToCart(name: string, price: number, image: string) {
    const product = { name, price, image };
    this.cartService.addToCart(product);
    console.log(`Agregado al carrito: ${name}, Precio: ${price}`);
  }

  // Método para abrir el modal del carrito
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartService.getCartItems() },
    });
    await modal.present();
  }
}
