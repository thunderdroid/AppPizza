import { Component, OnInit } from '@angular/core'; 
import { AngularFirestore } from '@angular/fire/compat/firestore';

// Definir la interfaz para los pedidos
interface Order {
  buyOrder: string;
  timestamp: any;  // O el tipo adecuado según tu base de datos
  cartItems: any[];  // O puedes especificar un tipo más concreto para los productos
  totalCost: number;
  orderDate?: string;  // Fecha que vamos a agregar
}

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {
  orders: Order[] = [];  // Lista para almacenar todos los pedidos

  constructor(private firestore: AngularFirestore) {}

  ngOnInit() {
    // Obtener todos los pedidos desde la colección 'orders'
    this.firestore
      .collection('orders')
      .get()
      .subscribe((querySnapshot) => {
        this.orders = [];  // Limpiar el arreglo antes de cargar los nuevos pedidos
        querySnapshot.forEach((doc) => {
          const order = doc.data() as Order;  

          // Convertir el timestamp en una fecha legible
          if (order.timestamp) {
            const orderDate = new Date(order.timestamp.seconds * 1000).toLocaleString();
            order.orderDate = orderDate; // Guardar la fecha en el objeto de cada pedido
          }

          // Añadir el pedido con su fecha a la lista de orders
          this.orders.push(order);
        });
      });
  }
}







