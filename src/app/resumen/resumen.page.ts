import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { LocationModalComponent } from '../location-modal/location-modal.component';
import { AddressService } from '../services/address.service';
import { PaymentMethodsComponent } from '../modals/payment-methods/payment-methods.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { v4 as uuidv4 } from 'uuid';  // Para generar ID aleatorias

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
  selectedPaymentMethod: string = '';
  selectedPaymentLogo: string = '';  // Almacena la ruta del logo
  cartItems: CartItem[] = [];  // Lista de productos en el carrito con el tipo CartItem
  deliveryCost: number = 0;  // Costo de delivery
  subtotal: number = 0;  // Subtotal de la compra
  totalCost: number = 0;  // Total final incluyendo delivery
  deliveryAddress: string = ''; // Dirección de entrega seleccionada

  constructor(
    private navController: NavController,
    private modalController: ModalController,
    private addressService: AddressService,
    private firestore: AngularFirestore 
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

  async openPaymentMethodsModal() {
    const modal = await this.modalController.create({
      component: PaymentMethodsComponent
    });

     // Espera a que el modal se cierre y obtenga el método de pago seleccionado
     modal.onDidDismiss().then((result) => {
      if (result.data && result.data.selectedMethod) {
        this.selectedPaymentMethod = result.data.selectedMethod;
        this.selectedPaymentLogo = result.data.logo;
      }
    });
    return await modal.present();
  }

  

  // Método para abrir el modal de ubicación
  async openLocationModal() {
    const modal = await this.modalController.create({
      component: LocationModalComponent,
    });

    // Esperar el cierre del modal y recibir la dirección seleccionada
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.deliveryAddress = data.data; // Cargar la dirección seleccionada
      }
    });

    return await modal.present();
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
  }

  

  
}

