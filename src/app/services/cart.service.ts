import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];


  constructor() { }
  // Añade un productos al carrito
  addToCart(product: any) {
    this.cartItems.push(product);
  }

  // Obtiene todos los productos del carrito
  getCartItems() {
    return this.cartItems;
  }

  // Elimina un producto del carrito
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Calcula el total del carrito
  getTotal() {
    return this.cartItems.reduce((total, product) => total + product.price, 0);
  }

  // Vacia el carrito
  clearCart() {
    this.cartItems = [];
  }
}
