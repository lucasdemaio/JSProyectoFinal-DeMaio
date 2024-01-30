export const productos = [
    {
      id: 1,
      nombre: "Hamburguesa completa",
      precio: 6260,
      descripcion: "Detalle: Jamon, queso, huevo, tomate, pepino y cebolla",
      imagen:"./assets/Hamb-completa.jpeg",
      categoria:"Hamburguesas"      
    },
    {
      id: 2,
      nombre: "Hamburguesa con queso",
      precio: 5500,
      descripcion: "Detalle: Queso, lechuga, tomate, pepino, cebolla",
      imagen:"./assets/Hamb-queso.jpeg",
      categoria:"Hamburguesas"
    },
    {
      id: 3,
      nombre: "Hamburguesa Veggie",
      precio: 6270,
      descripcion: "Detalle: Hamburguesa de lentejas y avena con mayonesa de zanahoria",
      imagen:"./assets/Hamb-veggie.jpeg",
      categoria:"Hamburguesas"
    },
    {
      id: 4,
      nombre: "Hamburguesa Brooklyn",
      precio: 6240,
      descripcion: "Detalle: Cebolla caramelizada, hongos asados, cheddar, rucula y alioli",
      imagen:"./assets/Hamb-broo.jpeg",
      categoria:"Hamburguesas"
    },
    {
      id: 5,
      nombre: "Hamburguesa Bronx",
      precio: 6150,
      descripcion: "Detalle: Doble Carne, cheddar, cebolla y doble panceta",
      imagen:"./assets/Hamb-bronx.jpeg",
      categoria:"Hamburguesas"
    },
    {
      id: 6,
      nombre: "Ensalada Cesar con Pollo",
      precio: 7100,
      descripcion: "Detalle: Lechuga, croutons, panceta, parmesano, pollo grillado y aderezo",
      imagen:"./assets/Ens-Cesar.jpeg",
      categoria:"Ensaladas"
    },
    {
      id: 7,
      nombre: "Ensalada de Salmon ahumado",
      precio: 9100,
      descripcion: "Detalle: Mix de verdes, cebolla morada, tomate, palta y salmon ahumado",
      imagen:"./assets/Ens-Salmon.jpeg",
      categoria:"Ensaladas"
    },
    {
      id: 8,
      nombre: "Papas fritas Detroit",
      precio: 4900,
      descripcion: "Detalle: papas fritas, doble Cheddar, panceta y verdeo",
      imagen:"./assets/Snack-Fritascheddar.jpeg",
      categoria:"Snacks"
    },
    {
      id: 9,
      nombre: "Papas fritas con panceta",
      precio: 5100,
      descripcion: "Detalle: Papas fritas, Panceta y doble huevo frito",
      imagen:"./assets/Snack-fritaspanceta.jpeg",
      categoria:"Snacks"
      },
      {
      id: 10,
      nombre: "Aros de cebolla",
      precio: 3990,
      descripcion: "Detalle: Aros de cebolla grandes fritos rebozados",
      imagen:"./assets/Snack-aros.jpeg",
      categoria:"Snacks"
      },
      {
      id: 11,
      nombre: "Torta Brownie",
      precio: 3960,
      descripcion: "Detalle: porción de torta brownie",
      imagen:"./assets/Postre-brownie.jpeg",
      categoria:"Postres"
      },
      {
      id: 12,
      nombre: "Torta de Manzana",
      precio: 3960,
      descripcion: "Detalle: porción torta de manzana",
      imagen:"./assets/Postre-tortamanzana.jpeg",
      categoria:"Postres"
      },
      {
      id: 13,
      nombre: "Agua mineral 500ml",
      precio: 1500,
      descripcion: "Detalle: Agua mineral",
      imagen:"./assets/Bebida-Agua.jpeg",
      categoria:"Bebidas"
      },
      {
      id: 14,
      nombre: "Coca Cola",
      precio: 1600,
      descripcion: "Detalle: Coca Cola 500ml",
      imagen:"./assets/Bebida-Coca.jpeg",
      categoria:"Bebidas"
      },
      {
      id: 15,
      nombre: "Sprite",
      precio: 1500,
      descripcion: "Detalle: Sprite 500ml",
      imagen:"./assets/Bebida-Sprite.jpeg",
      categoria:"Bebidas"
      },
  ];
  
  
  
  JSON.parse(localStorage.getItem("productos")) || localStorage.setItem("productos", JSON.stringify(productos));
  
  
