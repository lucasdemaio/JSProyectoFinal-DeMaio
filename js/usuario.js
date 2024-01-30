const formLogin = document.getElementById("user_login")
const btnLogin = document.getElementById("btn__loguearse")
const formRegistro = document.getElementById("user_register")
const btnRegistro = document.getElementById("btn-registro")

let usuarios = JSON.parse(localStorage.getItem("usuarios"))

// Definición de la clase nuevoUser que representa un nuevo usuario con propiedades específicas.
class nuevoUser{
    constructor(user, pass, nombre, apellido, telefono, direccion){
        this.id = usuarios.length + 1 // Asignación de un ID único al nuevo usuario.
        this.user = user
        this.pass = pass
        this.nombre = nombre
        this.apellido = apellido
        this.telefono = telefono
        this.direccion = direccion
        this.admin = false  // Se establece que el nuevo usuario no es un administrador por defecto.
    }
}
// Evento click del botón de login para validar las credenciales ingresadas.
btnLogin.addEventListener("click", (e) => {
    e.preventDefault()
    const user = formLogin.children[1].children[1].value
    const pass = formLogin.children[2].children[1].value
    validarLogin(user, pass)
})
// Función para validar el login con el usuario y contraseña proporcionados.
const validarLogin = (user, pass) => {
    const userExiste = usuarios.find((usuario)  => usuario?.user === user)
    // Verificación de existencia del usuario y coincidencia de la contraseña.
    if(userExiste === undefined || userExiste.pass !== pass){
        Swal.fire({
            icon: 'error',
            title: 'Error en usuario o contraseña',
            text: 'Por favor, verifica tu usuario y contraseña e inténtalo nuevamente.'
        });
    }else{
        Swal.fire({
            icon: 'sucess',
            title: `Bienvenido ${user}`,
            //text: 'Por favor, verifica tu usuario y contraseña e inténtalo nuevamente.'
        });       
        let usuario = {
            user: userExiste.user,
            pass: userExiste.pass,
            admin: userExiste.admin
        }
        setTimeout(() => {
            sessionStorage.setItem("usuario", JSON.stringify(usuario))
            location.href = "../index.html"
        }, 3000);
        
    }    
}
// Evento click del botón de registro para crear un nuevo usuario.
btnRegistro.addEventListener("click", (e) => {
    e.preventDefault()
    // Obtención de datos del formulario de registro.
    const user = formRegistro.children[1].children[1].value
    const pass = formRegistro.children[2].children[1].value
    const nombre = formRegistro.children[3].children[1].value
    const apellido = formRegistro.children[4].children[1].value
    const direccion = formRegistro.children[5].children[1].value
    const telefono = formRegistro.children[6].children[1].value
    // Creación de un nuevo usuario a partir de la clase nuevoUser.
    const nuevoUsuario = new nuevoUser(user, pass, nombre, apellido, direccion, telefono)
    // Llamada a la función Registrar para agregar el nuevo usuario.
    Registrar(nuevoUsuario)
})

// Función para registrar un nuevo usuario y almacenarlo en localstorage y sessionstorage.
const Registrar = (nuevoUsuario) => {
    // Verificación de existencia del usuario en la lista de usuarios.
    const userNuevo = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user)
    if(userNuevo === undefined){
        // Agregando el nuevo usuario a la lista, actualizando el almacenamiento y redireccionando.
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        Swal.fire({
            title: "Registrado correctamente",
            text: `Gracias ${nuevoUsuario.user} por registrarse!`,
            icon: "success"
        });

        // Esperar 3 segundos antes de redirigir al usuario al index.html
        setTimeout(() => {
            sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
            location.href = "../index.html";
        }, 3000);
    }else{
        // Mensaje de alerta en caso de que el usuario ya exista.

        Swal.fire({
            title: "Usuario existente",
            text: "Ya existe alguien registrado con el mismo usuario!",
            icon: "error"
          });
        sessionStorage.setItem("usuario", JSON.stringify(usuarios))
    }
}