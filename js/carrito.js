// Importar productosDisponibles desde homepage.js
import { productosDisponibles } from "./homepage.js"

// Inicializar el carrito desde sessionStorage
JSON.parse(sessionStorage.getItem("carrito")) === null && sessionStorage.setItem("carrito", JSON.stringify([]))

// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
    dibujarCarrito()
})

// Inicializar la variable 'carrito' con los productos del sessionStorage
let carrito = JSON.parse(sessionStorage.getItem("carrito"))
// Obtener referencias a elementos HTML
const listaCarrito = document.getElementById("items")
const footCarrito = document.getElementById("totales")
const btnCarrito = document.getElementById("btnCarrito")
const carritoTable = document.getElementById("carrito")

// Event listener para mostrar/ocultar el carrito al hacer clic en el botón
btnCarrito.addEventListener("click", (event) => {    
    event.stopPropagation();
    // Verificar si la tabla del carrito está actualmente visible
    if(carritoTable.style.display === "block"){
        // Si está visible, ocultarla
        carritoTable.style.display = "none"
    }else{
        // Si está oculta, mostrarla y dibujar el contenido del carrito
        carritoTable.style.display = "block"
        dibujarCarrito()
    }    
});

// Función para agregar un producto al carrito
export const comprarProducto = (idProducto) => {
    const producto = productosDisponibles.find((producto) => producto.id === idProducto);
    const { imagen, nombre, descripcion, categoria, precio, id } = producto;
    const productoCarrito = carrito.find((producto) => producto.id === idProducto);
  
    if (productoCarrito === undefined) {
      const nuevoProductoCarrito = {
        id: id,
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        descripcion: descripcion,
        categoria: categoria,
        cantidad: 1,
      };
  
      actualizarContadorCarrito();
      carrito.push(nuevoProductoCarrito);
  
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
      //Sweet Alert - Libreria
      Swal.fire({
        icon: 'success',
        title: 'Producto Agregado',
        text: `Ha agregado al carrito ${nombre}`,
      });
    } else {
      const indexProductoCarrito = carrito.findIndex((producto) => producto.id === idProducto);
      carrito[indexProductoCarrito].cantidad++;
      carrito[indexProductoCarrito].precio = precio * carrito[indexProductoCarrito].cantidad;
      sessionStorage.setItem('carrito', JSON.stringify(carrito));
  
      actualizarContadorCarrito();
      //Sweet Alert - Libreria
      Swal.fire({
        icon: 'success',
        title: 'Cantidad Actualizada',
        text: `Ha agregado un ${nombre} mas en su carrito.`,
      });
    }
};

// Función para dibujar el contenido del carrito en la interfaz
const dibujarCarrito = () => {
    // Limpiar el contenido previo del elemento HTML que muestra el carrito
    listaCarrito.innerHTML = ''
    // Iterar sobre cada producto en el carrito
    carrito.forEach(producto => {
    // Desestructurar la información del producto
    const {  imagen, nombre, cantidad, precio, id } = producto
    // Crear un nuevo elemento de fila (tr) para el producto en el carrito
    let body = document.createElement("tr")

    body.className = "producto__carrito"
    // Insertar el contenido HTML dentro de la fila con la información del producto
    body.innerHTML = `
    <th><img id="fotoProductoCarrito" src="${imagen}" class="card-img-top"</th>
    <td>${nombre}</td>
    <td>${cantidad}</td>
    <td>$${precio /cantidad}</td>
    <td>$${precio}</td>
    <td>
    <button id="+${id}" class="btn btn-success">+</button>
    <button id="-${id}" class="btn btn-danger">-</button>
    </td>
    `
    // Agregar la fila al elemento que muestra el carrito
    listaCarrito.append(body)
    // Obtener referencias a los botones de agregar y quitar cantidad
    const btnAgregar = document.getElementById(`+${id}`)
    const btnRestar = document.getElementById(`-${id}`)
    // Agrega event listeners a los botones para llamar a las funciones correspondientes
    btnAgregar.addEventListener("click", () => aumentarCantidad(id))
    btnRestar.addEventListener("click", () => restarCantidad(id))
    });

    // Llamar a la función que dibuja el pie de la tabla del carrito (footer)
    dibujarFooter()
}

// Función para dibujar el footer del carrito
const dibujarFooter = () => {
    // Generar totales del carrito
    const totales = generarTotales()
    // Verificar si el carrito tiene elementos
    if(carrito.length > 0){
        // Verificar si el costo total con descuento es mayor o igual a $15,000
        if(totales.costoTotal / 0.9 >= 15000){
            // Limpiar el contenido actual del footer
            footCarrito.innerHTML = ""
             // Crear una nueva fila para el footer con descuento
            let footer = document.createElement("tr")
            footer.innerHTML = `
            <td></td>
            <td><b>TOTAL con descuento 10% por compra superior $15.000</b></td>        
            <td>${generarTotales().cantidadTotal}</td>
            <td></td>
            <td>$${generarTotales().costoTotal}</td>
            <td><button id="btnFinalizarCompra" class="btn btn-success">Finalizar Compra</button><td>
            `
            // Agregar la fila al footer
            footCarrito.append(footer)            
        }
        else{
            // Limpiar el contenido actual del footer
            footCarrito.innerHTML = ""
            // Crear una nueva fila para el footer sin descuento
            let footer = document.createElement("tr")
            footer.innerHTML = `
            <td></td>
            <td><b>TOTAL</b></td>        
            <td>${generarTotales().cantidadTotal}</td>
            <td></td>
            <td>$${generarTotales().costoTotal}</td>
            <td><button id="btnFinalizarCompra" class="btn btn-success">Finalizar Compra</button><td>
            `
            // Agregar la fila al footer
            footCarrito.append(footer)        
        }
        const FinalizarCompra = document.getElementById("btnFinalizarCompra")
        FinalizarCompra.addEventListener("click", () => Comprar())    
    }else{
        // Si el carrito está vacío, mostrar un mensaje en el footer
        footCarrito.innerHTML = "<h3>Carrito Vacio</h3>"
    }
};

// Función que calcula el costo total y la cantidad total de productos en el carrito
const generarTotales = () => {
    // Calcula el costo total sumando los precios de todos los productos en el carrito
    let costoTotal = carrito.reduce((total, { precio }) => total + precio, 0)
    // Calcula la cantidad total sumando las cantidades de todos los productos en el carrito
    const cantidadTotal = carrito.reduce((total, {cantidad}) => total + cantidad, 0)
    // Verifica si el costo total es igual o mayor a 15000
    if (costoTotal >= 15000){
        // Aplica un descuento del 10% al costo total si es igual o mayor a 15000
        costoTotal = Math.round(costoTotal * 0.9)
        // Devuelve un objeto con el costo total después del descuento y la cantidad total
        return {
            costoTotal: costoTotal,
            cantidadTotal: cantidadTotal
        }
    }else{
        // Devuelve un objeto con el costo total sin descuento y la cantidad total
        return {
            costoTotal: costoTotal,
            cantidadTotal: cantidadTotal
        }
    }    
};

// Función para aumentar la cantidad de un producto en el carrito
const aumentarCantidad = (id) => {
    // Encuentra el índice del producto en el carrito que coincide con el ID proporcionado
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    // Calcula el precio unitario del producto
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad
    // Incrementa la cantidad del producto en el carrito
    carrito[indexProductoCarrito].cantidad++
    // Actualiza el precio total del producto en el carrito
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad
    // Almacena la información actualizada del carrito en sessionStorage
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    // Actualiza el contador de productos en el carrito
    actualizarContadorCarrito()
    // Vuelve a dibujar la interfaz del carrito con los cambios
    dibujarCarrito()
};

// Función para restar la cantidad de un producto en el carrito
const restarCantidad = (id) => {
    // Encuentra el índice del producto en el carrito que coincide con el ID proporcionado
    const indexProductoCarrito = carrito.findIndex((producto) => producto.id === id)
    // Calcula el precio unitario del producto
    const precio = carrito[indexProductoCarrito].precio / carrito[indexProductoCarrito].cantidad
    // Decrementa la cantidad del producto en el carrito
    carrito[indexProductoCarrito].cantidad--
    // Actualiza el precio total del producto en el carrito
    carrito[indexProductoCarrito].precio = precio*carrito[indexProductoCarrito].cantidad
    // Si la cantidad del producto llega a cero, elimina el producto del carrito
    if(carrito[indexProductoCarrito].cantidad === 0){
        carrito.splice(indexProductoCarrito, 1)
    }
    // Almacena la información actualizada del carrito en sessionStorage
    sessionStorage.setItem("carrito", JSON.stringify(carrito))
    // Actualiza el contador de productos en el carrito
    actualizarContadorCarrito()
    // Vuelve a dibujar la interfaz del carrito con los cambios
    dibujarCarrito()
};

const actualizarContadorCarrito = () => {
    const contadorCarrito = document.getElementById('contador__carrito');
    // Calcular la cantidad total de productos en el carrito
    const cantidadTotal = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    console.log(cantidadTotal);

    // Actualizar el contenido del botón con la cantidad total
    contadorCarrito.innerHTML = `${cantidadTotal === 0 ? '' : cantidadTotal}`;
};

const Comprar = () => {
    
    Swal.fire({
        icon: 'success',
        title: 'Compra realizada con éxito',
        text: 'Gracias por tu compra. ¡Disfruta de tus productos!',
    });      
    setTimeout(() => {
        // Limpiar el carrito
        carrito = [];
        sessionStorage.removeItem('carrito');    
        // Actualizar la interfaz del carrito
        actualizarInterfazCarrito();
        location.reload();
    }, 4000);
};

const actualizarInterfazCarrito = () => {
    listaCarrito.innerHTML = '';
    footCarrito.innerHTML = '';
};