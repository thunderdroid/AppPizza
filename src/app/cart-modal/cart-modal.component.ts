import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.component.html',
  styleUrls: ['./cart-modal.component.scss'],
})
export class CartModalComponent implements OnInit {
  cartItems: any[] = [];

  constructor(
    private modalController: ModalController,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadCartItems();
  }

 
  ionViewWillEnter() {
    this.loadCartItems();
  }

  // Método para cargar los productos del carrito
  private loadCartItems() {
    this.cartItems = this.cartService.getCartItems();
  }

  // Elimina un producto del carrito
  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.loadCartItems();
  }

  // Obteien el total de los productos del  carrito
  getTotal() {
    return this.cartService.getTotal();
  }

  
  closeCart() {
    this.modalController.dismiss();
  }
}


