// Importar la función comprarProducto desde el módulo "carrito.js"
import { comprarProducto } from "./carrito.js"
import { eliminarProducto } from "./admin.js"

// Obtener referencias a elementos HTML
const userLogin = document.getElementById("userLogin")
const divProductos = document.getElementById("productos")
const filterInput = document.getElementById("filter_input")
const menuLista = document.getElementById("menu_lista")
const filterNombre = document.getElementById("filter-nombre")
const filterPrecio = document.getElementById("filter-precio")

// Obtener productos disponibles desde el almacenamiento local
export let productosDisponibles = JSON.parse(localStorage.getItem("productos"))

let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))

// Esperar a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener("DOMContentLoaded", () => {
  // Verifica si el usuario está logeado (comprobando si 'usuarioLogeado' es nulo)
  if(usuarioLogeado === null){
     // Si el usuario no está logeado, crea un enlace de login
    const a = document.createElement("a")
    a.id = "login"
    a.href = "./pages/usuarios.html"
    a.innerHTML = "Login"
    // Agrega el enlace de login al elemento con id 'userLogin' en el documento
    userLogin.appendChild(a)
  }else{
    // Si el usuario está logeado, crea un mensaje de bienvenida y un botón de logout
    const p = document.createElement("p")
    const close = document.createElement("button")
    
    p.innerHTML = `Bienvenido ${usuarioLogeado.user}`
    close.id = "boton-logout"
    close.innerHTML = "Logout"
    close.addEventListener("click", () => {
      Swal.fire({
        title: "Esta seguro desea salir?",
        //text: "",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, salir!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: `${usuarioLogeado.user} Deslogueado!`,
            text: "Lo esperamos pronto!",
            icon: "success"
          });
        }
      });
      setTimeout(() => {
        sessionStorage.removeItem("usuario")
        location.reload()
      }, 5000);     
    })

    // Agrega el mensaje y el botón de logout al elemento con id 'userLogin' en el documento
    userLogin.appendChild(p)
    userLogin.appendChild(close)
  }

  // Generar las tarjetas de productos en la interfaz
  generarCardsProductos(productosDisponibles)
})

// Función para generar tarjetas de productos en la interfaz
export const generarCardsProductos = (productos) => {
  // Limpiar el contenido actual del contenedor de productos
  divProductos.innerHTML = "";
  // Iterar sobre la lista de productos y generar tarjetas para cada uno
  productos.forEach((producto) => {
  
  //// Destructuracion de propiedades del producto
  const { imagen, nombre, descripcion, categoria, precio, id } = producto
  
  // Crear un elemento div para representar la tarjeta del producto
  let card = document.createElement("div");
  card.className = "producto";
  card.innerHTML = `
  <div class="card" style="width: 18rem;">
  <img class="card-img-top" src="${imagen}" alt="Card image cap">
  <div class="card-body">
  <p class="card-title">${nombre}</p>
  <p class="card-descripcion">${descripcion}</p>        
  <p class="card-text">Precio: <b>$${precio}</b></p>
  <button id="btn${id}" class="btn btn-primary">AGREGAR</button>
  ${
    usuarioLogeado?.admin === true ? `<button id="eliminar${id}" class="btn btn-danger">Eliminar</button>`  : ""
  }
  </div>
  </div>`;
  // Agregar la tarjeta al contenedor de productos
  divProductos.appendChild(card);
  // Obtener referencia al botón de compra y agregar un event listener
  const btnComprar = document.getElementById(`btn${id}`)
  btnComprar.addEventListener("click", () => comprarProducto(id))

  if(usuarioLogeado?.admin === true){
    const btnEliminar = document.getElementById(`eliminar${id}`)
    btnEliminar.addEventListener("click", () => eliminarProducto(id))
  }
  });
};

// Evento que se activa al escribir en un campo de entrada, filtrando productos disponibles según el valor ingresado.
filterInput.addEventListener("keyup", (e) => {
  // Filtra productos por coincidencia en la descripción o nombre, en función del texto ingresado.
  const productosFilter = productosDisponibles.filter((producto) => producto.descripcion.toLowerCase().includes(e.target.value) || producto.nombre.toLowerCase().includes(e.target.value))
  // Actualiza la lista de productos disponibles con los productos filtrados.
  productosDisponibles = productosFilter
  // Si se ingresó algún texto, genera y muestra tarjetas de productos filtrados; 
  //de lo contrario, muestra todos los productos.
  if(e.target.value !== ""){
    generarCardsProductos(productosFilter)
  }else{
    // Si no hay texto, recupera todos los productos desde el almacenamiento local y 
    // muestra tarjetas de todos los productos.
    productosDisponibles = JSON.parse(localStorage.getItem("productos"))
    generarCardsProductos(productosDisponibles)
  }
})

// Evento que se activa al hacer clic en un elemento de la lista de categorías, 
//filtrando productos por la categoría seleccionada.
menuLista.addEventListener("click", (e) => {
  // Filtra productos por coincidencia en la categoría, en función de la categoría seleccionada.
  const productosFilter = productosDisponibles.filter((producto) => producto.categoria.toLowerCase().includes(e.target.innerHTML.toLowerCase()))
  // Actualiza la lista de productos disponibles con los productos filtrados.
  productosDisponibles = productosFilter
  // Si se selecciona una categoría específica, genera y muestra tarjetas de productos filtrados; 
  // de lo contrario, muestra todos los productos.
  if(e.target.innerHTML !== "Todos"){
    generarCardsProductos(productosFilter)
  }else{
    // Si se selecciona "Todos", recupera todos los productos desde localstorage y 
    // muestra tarjetas de todos los productos.
    productosDisponibles = JSON.parse(localStorage.getItem("productos"))
    generarCardsProductos(productosDisponibles)
  }

})
// Evento que se activa al hacer clic en un elemento de filtrado por nombre, 
//aplicando un filtro adicional según el nombre seleccionado.
filterNombre.addEventListener("click", (e) => {
  filtrarPorNombre(e.target.innerHTML)
})

// Función para filtrar productos por nombre según el criterio de orden especificado.
const filtrarPorNombre = (orden) => {
  let productos
  // Orden alfabético de A a Z
  if(orden === "Alfabeticamente A-Z"){
    productos = productosDisponibles.sort((a, b) => {
      if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
        return 1
      }else if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
        return -1
      }else{
        return 0
      }
    })
  // Orden alfabético de Z a A  
  }else if(orden === "Alfabeticamente Z-A"){
    productos = productosDisponibles.sort((a, b) => {
      if(a.nombre.toLowerCase() < b.nombre.toLowerCase()){
        return 1
      }else if(a.nombre.toLowerCase() > b.nombre.toLowerCase()){
        return -1
      }else{
        return 0
      }
    })
  }
  // Generar las tarjetas de productos después de aplicar el filtro
  generarCardsProductos(productos)
}

// Evento de clic en el filtro de precios para ordenar los productos por precio.
filterPrecio.addEventListener("click", (e) => {

  const orden = e.target.innerHTML
  let productos
  // Orden de precio de más bajo a más alto
  if(orden === "Mas Bajo a mas Alto"){
    productos = productosDisponibles.sort((a, b) => a.precio - b.precio)
  // Orden de precio de más alto a más bajo  
  }else if(orden === "Mas Alto a mas Bajo"){
    productos = productosDisponibles.sort((a, b) => b.precio - a.precio)
  }
  // Generar las tarjetas de productos después de aplicar el filtro
  generarCardsProductos(productos)
})