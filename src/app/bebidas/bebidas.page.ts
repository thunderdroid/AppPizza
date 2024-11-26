import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LocationModalComponent } from '../location-modal/location-modal.component'; // Asegúrate de que la ruta sea correcta
import { CartModalComponent } from '../cart-modal/cart-modal.component';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service'; // Asegúrate de importar el servicio de productos
import { Subscription } from 'rxjs'; 


@Component({
  selector: 'app-bebidas',
  templateUrl: './bebidas.page.html',
  styleUrls: ['./bebidas.page.scss'],
})
export class BebidasPage implements OnInit, OnDestroy {
  selectedAddress: string = 'Agregar dirección'; // Valor inicial del título
  productos: any[] = [];  // Usamos un array simple sin un modelo definido
  cartItemCount: number = 0; // Contador de productos en el carrito
  private cartItemsSubscription!: Subscription; // Suscripción para manejar el contador del carrito

  constructor(private router: Router, private modalController: ModalController, private cartService: CartService, private productsService: ProductsService ) { }

  ngOnInit() {
    this.cargarProductos('bebidas');

     // Nos suscribimos al carrito para obtener el contador de productos en tiempo real
     this.cartItemsSubscription = this.cartService.getCartItems().subscribe(() => {
      this.cartItemCount = this.cartService.getCartItemCount(); // Actualizamos el contador de productos
    });
  }

  ngOnDestroy() {
    // Nos desuscribimos cuando el componente se destruya
    if (this.cartItemsSubscription) {
      this.cartItemsSubscription.unsubscribe();
    }
  }

  cargarProductos(categoria: string) {
    this.productsService.obtenerProductos(categoria).subscribe((productos) => {
      this.productos = productos;
    });
  }

  onSegmentChange(event: any) {
    const selectedValue = event.detail.value;

    switch (selectedValue) {
      case 'pizzas':
        this.router.navigate(['/menu']);
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
      this.selectedAddress = data; // Actualiza el texto con la dirección seleccionada
    }
  }

  // Agregar los productos al carrito utlizando el servicio de cartservice
  addToCart(name: string, price: number, image: string) {
    const product = { name, price, image };
    this.cartService.addToCart(product);
    console.log(`Agregado al carrito: ${name}, Precio: ${price}`);
  }

  // abre el  modal del carrito de compras.
  async openCartModal() {
    const modal = await this.modalController.create({
      component: CartModalComponent,
      componentProps: { cartItems: this.cartService.getCartItems() },
    });
    await modal.present();
  }

   // Método para actualizar el conteo de productos en el carrito
   updateCartItemCount() {
    this.cartItemCount = this.cartService.getCartItemCount();
  }
}
