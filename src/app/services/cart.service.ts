import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  constructor() {}

  // Añadir producto al carrito
  addToCart(product: any) {
    // Verificar si el producto ya está en el carrito
    const existingItem = this.cartItems.find(item => item.name === product.name);
    if (existingItem) {
      existingItem.quantity += 1; // Incrementar la cantidad si el producto ya está en el carrito
    } else {
      this.cartItems.push({ ...product, quantity: 1 }); // Si no, agregar el producto con cantidad 1
    }
  }

  // Obtener todos los productos del carrito
  getCartItems() {
    return this.cartItems;
  }

  // Eliminar producto del carrito
  removeItem(index: number) {
    this.cartItems.splice(index, 1);
  }

  // Aumentar la cantidad de un producto
  increaseQuantity(index: number) {
    this.cartItems[index].quantity += 1;
  }

  // Disminuir la cantidad de un producto
  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity -= 1;
    }
  }

  // Calcular el total del carrito
  getTotal() {
    return this.cartItems.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  // Vaciar el carrito
  clearCart() {
    this.cartItems = [];
  }
}
