import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { AddressService } from '../services/address.service';

// Definir la interfaz para los elementos del carrito
interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.page.html',
  styleUrls: ['./resumen.page.scss'],
})
export class ResumenPage implements OnInit {

  cartItems: CartItem[] = [];  // Lista de productos en el carrito con el tipo CartItem
  deliveryCost: number = 0;  // Costo de delivery
  subtotal: number = 0;  // Subtotal de la compra
  totalCost: number = 0;  // Total final incluyendo delivery
  deliveryAddress: string = ''; // Dirección de entrega seleccionada

  constructor(
    private navController: NavController,
    private modalController: ModalController,
    private addressService: AddressService,
  ) {
    // Obtener los datos pasados desde la página anterior (carrito)
    const navigation = history.state;
    if (navigation) {
      this.cartItems = navigation.cartItems || [];
      this.subtotal = navigation.subtotal || 0;
      this.deliveryCost = navigation.deliveryCost || 0;
      this.totalCost = navigation.totalCost || 0;
    } else {
      // Si no se pasa nada, se cargan los datos del localStorage
      this.cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
    }

    this.calculateTotal();  // Calcular total cuando se cargan los datos
  }

  ngOnInit() {
    this.deliveryAddress = this.addressService.getSelectedAddress();
  }
  

  // Función para abrir el modal del carrito
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,  // Asegúrate de que el componente del modal esté correctamente configurado
      componentProps: { cartItems: this.cartItems }  // Pasar los items del carrito como props al modal
    });
    await modal.present();
  }

  // Función para calcular el total
  calculateTotal() {
    // Si no se ha calculado previamente el subtotal, lo calculamos ahora
    if (this.subtotal === 0) {
      this.subtotal = this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    // Si el subtotal es mayor o igual a $26.000, el delivery es gratis
    if (this.subtotal >= 26000) {
      this.deliveryCost = 0;
    } else {
      this.deliveryCost = 2990; // Costo de delivery si el subtotal es menor
    }

    // Calcula el total
    this.totalCost = this.subtotal + this.deliveryCost;
  }

  // Función para confirmar el pedido
  confirmOrder() {
    // Lógica para confirmar el pedido
    alert(`Pedido confirmado! Total: $${this.totalCost}`);
    // Redirigir a la página de confirmación, pago o lo que sea necesario
    this.navController.navigateForward('/confirmation');  // Ejemplo de navegación
  }
}

