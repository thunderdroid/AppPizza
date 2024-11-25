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
      // Recargar los productos de la categoría seleccionada
      this.cargarProductos();
      this.limpiarCampos();
    }).catch(error => {
      console.error('Error al agregar producto', error);
    });
  }

  // Cargar productos por categoría
  cargarProductos() {
    // Llamar al servicio para obtener los productos filtrados por categoría
    this.productsservice.obtenerProductos(this.categoria).subscribe((productos) => {
      this.productos = productos.map((producto: any) => {
        return { ...producto, id: producto.id }; // Asegurarse de que el id esté presente
      });
    }, (error) => {
      console.error('Error al cargar productos', error);
    });
  }

  // Eliminar un producto
  eliminarProducto(id: string) {
    this.productsservice.eliminarProducto(id).then(() => {
      // Recargar los productos de la categoría seleccionada después de eliminar
      this.cargarProductos();
    }).catch(error => {
      console.error('Error al eliminar producto', error);
    });
  }

  // Limpiar los campos después de agregar un producto
  limpiarCampos() {
    this.nombre = '';
    this.precio = 0;
    this.imagen = '';
    this.categoria = 'pizzas'; // Resetear la categoría a 'pizzas'
  }

  // Cambiar la categoría y recargar productos
  cambiarCategoria() {
    this.cargarProductos(); // Cargar los productos de la nueva categoría seleccionada
  }
}

