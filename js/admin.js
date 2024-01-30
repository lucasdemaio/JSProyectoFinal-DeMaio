// Importación de funciones desde el módulo homepage.js
import { generarCardsProductos, productosDisponibles } from "./homepage.js"

// Función para eliminar un producto por su ID
export const eliminarProducto = (id) => {
    // Buscar la posición del producto en el array productosDisponibles por su ID
    const productoEliminar = productosDisponibles.findIndex(( producto ) => producto.id === id)
    // Eliminar el producto del array utilizando splice
    productosDisponibles.splice(productoEliminar, 1)
    // Actualizar el almacenamiento local con la lista de productos actualizada
    localStorage.setItem("productos", JSON.stringify(productosDisponibles))
    // Generar y mostrar las tarjetas de productos actualizadas en la interfaz
    generarCardsProductos(JSON.parse(localStorage.getItem("productos")))
}