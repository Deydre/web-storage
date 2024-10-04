// If el array de localStorage existe y es mayor que 0, no borrarñp
if (!localStorage.getItem("Contactos")) {
    localStorage.setItem("Contactos", JSON.stringify([]));
}

// Acceder al form y div del body y guardarlos
let form = document.querySelector('form');
let divLista = document.querySelector("#divLista");
let contacts = [];
// Crear ul y agregarla al div
let ul = document.createElement("ul");
divLista.appendChild(ul);


// Evento de submit
form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Accedemos a cada input del formulario
    let nombre = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let mensaje = event.target.elements.comments.value;
    // IMAGEN PASARLO A "URL" EN EL FORMULARIO
    let imagen = event.target.elements.image.value;

    // Crear objeto
    let contact = {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        imagen: imagen
    }

    guardarUser(contact);
    pintarUser(contact);

});

// Función/ Subir user a Web Storage
function guardarUser(contacto) {
    contacts.push(contacto);
    // Transformar el array a String y subirlo a Web Storage
    localStorage.setItem("Contactos", JSON.stringify(contacts));
}

// Función/ Get users de Web Storage
function getUsers() {
    let usersStorage = localStorage.getItem("Contactos");
    // Transformar el array de vuelta porque estaba en String
    return JSON.parse(usersStorage);
}

// Función/ Pintar un user en una tarjetita
function pintarUser(contacto){

    let li = document.createElement("li");

    let nombre1 = document.createElement("p");
    nombre1.textContent = `Nombre: ${contacto.nombre}`;

    let email1 = document.createElement("p");
    email1.textContent = `Email: ${contacto.email}`;

    let mensaje1 = document.createElement("p");
    mensaje1.textContent = `Mensaje: ${contacto.mensaje}`;

    let imagen1 = document.createElement("p");
    imagen1.textContent = `Imagen de ${contacto.nombre}`

    // Unimos todos los p al li
    li.appendChild(nombre1);
    li.appendChild(email1);
    li.appendChild(mensaje1);
    li.appendChild(imagen1);
    // Unimos el li al ul
    ul.appendChild(li);
}

    

// Crea botón para borrar todos los contactos guardados en Local Storage y en el DOM
form.addEventListener('reset', (event) => {
    event.preventDefault();
    const emailBorrar = event.target.elements.emailBorrar.value;

    // Si no se pone ningún numero
    if (emailBorrar === '') {
        // Borrar todos los contactos
        localStorage.removeItem("Contactos");
        // Borrar lo pintado en el DOM
        divLista.innerHTML = '';
        // Si se pone un email
    } else {
        // Bajar todo del local storage
        // let listUsers = getUsers();
        // // Filter y cargarse contacto
        // let emailSeleccionado = listUsers.filter(user => user.email === emailBorrar);
        // let indice = indexOf(listUsers.filter(user => user.email === emailBorrar));
        // if (listUsers.includes(emailSeleccionado)){
        //     // Borrar del array el índice del email seleccionado
        //     listUsers.splice(indice, 1);
        // }
        // Volver a subir

        // console.log(numeroUsuario);
        // localStorage.setItem("Contactos", JSON.stringify(contacts));

    }
});

// USAR FUNCIONES