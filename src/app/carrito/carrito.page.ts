import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  pizzas = [
    { name: 'Margherita', description: 'Tomate, mozzarella y albahaca', price: 10, quantity: 1 },
    { name: 'Pepperoni', description: 'Salsa de tomate y pepperoni', price: 12, quantity: 1 },
    { name: 'Cuatro Quesos', description: 'Mozzarella, gorgonzola, parmesano y cheddar', price: 14, quantity: 1 },
  ];

  constructor() { }

  ngOnInit() { }

  updateQuantity(pizza, change: number) {
    const newQuantity = pizza.quantity + change;
    if (newQuantity > 0) {
      pizza.quantity = newQuantity;
    }
  }

  removePizza(pizza) {
    this.pizzas = this.pizzas.filter(p => p !== pizza);
  }

  getTotal() {
    return this.pizzas.reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  }

  proceedToCheckout() {
    console.log('Procediendo al pago...');
  }

  getPizzaImage(name: string) {
    const images = {
      'Margherita': 'assets/images/margherita.jpg',
      'Pepperoni': 'assets/images/pepperoni.jpg',
      'Cuatro Quesos': 'assets/images/cuatro_quesos.jpg'
    };
    return images[name] || 'assets/images/default.jpg'; // Imagen por defecto
  }
}


