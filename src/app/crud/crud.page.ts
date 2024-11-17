import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service'; // Asegúrate de importar el servicio de productos

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {
  nombre: string = '';
  precio: number = 0;
  imagen: string = '';
  categoria: string = 'pizzas'; // Por defecto, pizzas
  productos: any[] = [];

  constructor(private productsservice: ProductsService) {}

  ngOnInit() {
    // Cargar los productos al inicializar la página
    this.cargarProductos();
  }

  // Crear un producto
  agregarProducto() {
    const nuevoProducto = {
      nombre: this.nombre,
      precio: this.precio,
      imagen: this.imagen,
      categoria: this.categoria,
    };

    this.productsservice.agregarProducto(nuevoProducto).then(() => {
      this.cargarProductos();
      this.limpiarCampos();
    });
  }

  // Cargar productos por categoría
  cargarProductos() {
    this.productsservice.obtenerProductos(this.categoria).subscribe((productos) => {
      // Agregar el id del documento a cada producto
      this.productos = productos.map((producto: any) => {
        return { ...producto, id: producto.id }; // Añadir el id
      });
    });
  }

  // Eliminar un producto
  eliminarProducto(id: string) {
    this.productsservice.eliminarProducto(id).then(() => {
      this.cargarProductos(); // Recargar productos después de la eliminación
    }).catch(error => {
      console.error("Error al eliminar el producto:", error);
    });
  }

  // Limpiar los campos después de agregar un producto
  limpiarCampos() {
    this.nombre = '';
    this.precio = 0;
    this.imagen = '';
    this.categoria = 'pizzas'; // Resetear la categoría a 'pizzas'
  }
}
