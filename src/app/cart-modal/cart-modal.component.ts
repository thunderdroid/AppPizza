import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';
import { AddressService } from '../services/address.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService,
    private addressService: AddressService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

  ionViewWillEnter() {
    this.loadCartItems();
  }

  // Cargar los productos del carrito
  private loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  // Aumentar la cantidad de un producto
  increaseQuantity(index: number) {
    this.cartService.increaseQuantity(index);
    this.loadCartItems(); // Recargar el carrito para reflejar los cambios
  }

  // Disminuir la cantidad de un producto
  decreaseQuantity(index: number) {
    this.cartService.decreaseQuantity(index);
    this.loadCartItems(); // Recargar el carrito para reflejar los cambios
  }

  // Eliminar un producto del carrito
  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.loadCartItems(); // Recargar el carrito después de eliminar el producto
  }

  // Obtener el total del carrito
  getTotal() {
    return this.cartService.getTotal();
  }

  // Cerrar el modal del carrito
  closeCart() {
    this.modalController.dismiss();
  }

  // Función placeholder para el botón "Ir al Pago"
  goToPayment() {
    const total = this.getTotal();
    const deliveryCost = total >= 26000 ? 0 : 2990; // Si el total es mayor a 26,000, el envío es gratis
    const subtotal = total + deliveryCost;
    // Redirigir al resumen de compra y pasar los datos
    this.navController.navigateForward('/resumen', {
      state: { 
        cartItems: this.cartItems,
        subtotal: subtotal,
        deliveryCost: deliveryCost,
        totalCost: total + deliveryCost,
      }
    });
    this.closeCart(); // Cerrar el modal después de redirigir
  }

  
}


