const divSucursales = document.getElementById("sucursales")

const urlSucursales = "../sucursales.json"
let mensajeError;

fetch(urlSucursales)
  .then((response) => response.json())
  .then((data) => {
    data.forEach((sucursal) => {
      const card = document.createElement("div");
      card.className = "sucursal";
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="${sucursal.imagen}" alt="Card image cap">
          <div class="card-body">
            <p class="card-title">${sucursal.ciudad} - ${sucursal.pais}</p>
            <p class="card-descripcion">${sucursal.direccion} </p>
            <p class="card-descripcion">Telefono: ${sucursal.telefono}</p>       
          </div>
        </div>`;
      // Agregar la tarjeta al contenedor de productos
      divSucursales.appendChild(card);
    });
  })
  .catch((error) => {
    // Verificar si la respuesta es HTML (puede ser un mensaje de error del servidor)
    if (error instanceof SyntaxError) {
      // La respuesta no es JSON válido, probablemente HTML
      mensajeError = `Error en la respuesta del servidor. Vuelva a intentarlo más tarde.`;
    } else {
      // Error normal
      mensajeError = `${error.message} - Vuelva a intentarlo más tarde`;
    }
    
    let div = document.createElement("div");
    div.innerHTML = `
        <div>
            <p>${mensajeError}</p>   
        </div>`;
    document.body.append(div);
  });

   

