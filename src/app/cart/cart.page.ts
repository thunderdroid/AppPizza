import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage  {
  cart: { name: string; image: string; price: number }[] =  [];

  constructor(private modalController: ModalController) { }

  addToCart(name: string, image: string, price: number) {
    const product = { name, image, price };
    this.cart.push(product);
  }
    
  
  removeFromCart(index: number) {
    this.cart.splice(index, 1);
  }

  getTotal() {
    return this.cart.reduce((acc, product) => acc + product.price, 0);
  }

  closeCart() {
    this.modalController.dismiss();
  }



 

}
