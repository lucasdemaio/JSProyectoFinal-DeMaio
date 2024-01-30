export let dBusuarios = [
    {
      id: 1,
      user: "admin",
      pass: "coder1234",
      nombre: "nombreadmin",
      apellido: "apellidoadmin",
      direccion: "direccionadmin",
      telefono: "12345678",      
      admin: true,
    },
  ];

 
JSON.parse(localStorage.getItem("usuarios")) || localStorage.setItem("usuarios", JSON.stringify(dBusuarios));


