// 1. Formulario de contacto - Local Storage
// Crear un formulario de contacto con los siguientes campos:
// Nombre
// Email
// Mensaje
// URL imagen

// Guardar en Local Storage los datos de contacto enviados de cada usuario
// Mostrar los datos de los contactos guardados en el DOM
// Usa JSON.parse() y JSON.stringify() para guardar muchos datos usando la misma clave
// Crea botón para borrar todos los contactos guardados en Local Storage
// Crea botón para borrar un contacto en concreto de Local Storage.
// NOTA IMPORTANTE: La estructura de datos de usuarios consistirá en un array de objetos [{..},{..},{..}...{..}] almacenado en Local Storage


let form = document.querySelector('form');

let contacts = [];


// PINTAR DATOS EN EL DOM
// Acceder al div del body  y guardarlo
let divLista = document.querySelector("#divLista");
// Crear ul (le meteremos lis cada vez que hagamos submit)
let ul = document.createElement("ul");
// Agregar ul al div
divLista.appendChild(ul);

// Evento de submit
form.addEventListener('submit', (event) => {
    event.preventDefault(); 
    // Accedemos a cada input del formulario
    let nombre = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let mensaje = event.target.elements.comments.value;
    let imagen = event.target.elements.image.value;

    // Crear objeto
    let contact = {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        imagen: imagen
    }

    // Meter el objeto dentro del array contacts
    contacts.push(contact);
    // Transformar el array a String y subirlo a Web Storage
    localStorage.setItem("Contactos", JSON.stringify(contacts));

    // PINTAR EL OBJETO EN EL DOM
     // Creamos un li
     let li = document.createElement("li");

     // Con cada input
     // Creamos un elemento p
     let nombre1 = document.createElement("p");
     // Le añadimos la info
     nombre1.textContent = `Nombre: ${contact.nombre}`;

     let email1 = document.createElement("p");
     email1.textContent = `Email: ${contact.email}`;

     let mensaje1 = document.createElement("p");
     mensaje1.textContent = `Mensaje: ${contact.mensaje}`;

     let imagen1 =document.createElement("p");
     imagen1.textContent = `Imagen de ${contact.nombre}`

     // Unimos todos los p al li
     li.appendChild(nombre1);
     li.appendChild(email1);
     li.appendChild(mensaje1);
     li.appendChild(imagen1);
     // Unimos el li al ul
     ul.appendChild(li);

});


// Crea botón para borrar todos los contactos guardados en Local Storage Y EN EL dom
// NUEVO ------------desde aquí --->
form.addEventListener('reset', (event) => {
    event.preventDefault(); 
    const numeroUsuario = event.target.elements.number.value;
    let contactos = JSON.parse(localStorage.getItem("Contactos")) || [];

    // Si no se pone ningún numero
    if (numeroUsuario === '') {
        // Borrar todos los contactos
        localStorage.removeItem("Contactos");
        // Borrar lo pitnado en el DOM
        divLista.innerHTML = ''; 
    // Si se pone un número
    } else {
        // Filtrar para eliminar el de ese número 
        console.log(numeroUsuario);
        contacts = contactos.filter((contacto, i) => (i !== numeroUsuario + 1));
        localStorage.setItem("Contactos", JSON.stringify(contacts));


    }
});




