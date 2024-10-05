//PINTA DOS TARJETAS AL MDOIFICARLO. Te lo modifica pero a aprte te añade otra.
//hay que buscar alguna solución y tenemos que hacer que antes de pintar en el DOM , 
//debe comprobar si existe, si no existe lo debe pintar y si existe lo modifique. 




// If el array de localStorage existe y es mayor que 0, no borrarñp 
//aseguramos de que haya siempre un item llamado contactos
if (!localStorage.getItem("Contactos")) {
    localStorage.setItem("Contactos", JSON.stringify([]));
}

// Acceder al form y div del body y guardarlos
let form = document.querySelector('form');
let divLista = document.querySelector("#divLista");
let contacts = [];   //alamacenaremos una lista de contactos más adelante
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
    pintarUser(contact)

});

// Función/ Subir user a Web Storage
function guardarUser(contacto) {
    contacts.push(contacto);
    // Transformar el array a String y subirlo a Web Storage
    actualizarUsers(contacts);
}

//convierte en una cadena de texto /almacena en local Storage bajo los contactos
function actualizarUsers(contacts) {
    localStorage.setItem("Contactos", JSON.stringify(contacts));
}

// Función/ Get users de Web Storage
function getUsers() {
    let usersStorage = localStorage.getItem("Contactos");
    // Transformar el array de vuelta porque estaba en String
    return JSON.parse(usersStorage);
}

// Función/ Pintar un user en una tarjetita
function pintarUser(contacto) {

    let li = document.createElement("li");

    //AÑADIDO  añado atributo específico la lista con el email del contacto
    //cada lista, tienen un valor únioc data-emial , que ocrresponde con el email del contacto
    li.setAttribute("data-email", contacto.email);

    let nombre1 = document.createElement("p");
    nombre1.textContent = `Nombre: ${contacto.nombre}`;

    let email1 = document.createElement("p");
    email1.textContent = `Email: ${contacto.email}`;

    let mensaje1 = document.createElement("p");
    mensaje1.textContent = `Mensaje: ${contacto.mensaje}`;

    let imagen1 = document.createElement("p");
    imagen1.textContent = `Imagen de ${contacto.nombre}`

    //Añadido 
    // Crear un icono de lápiz para editar
    let editIcon = document.createElement("span");
    editIcon.textContent = "✏️"; // Puedes usar un emoji o una imagen
    editIcon.style.cursor = "pointer"; // Cambiar el cursor para indicar que es clickeable
    editIcon.style.marginLeft = "10px"; // Un poco de margen para que no esté pegado al texto

    // Añadir evento de clic para editar
    editIcon.addEventListener("click", () => {
        editarUsuario(contacto);
    });

    // Unimos todos los p al li
    li.appendChild(nombre1);
    li.appendChild(email1);
    li.appendChild(mensaje1);
    li.appendChild(imagen1);
    li.appendChild(editIcon); //icono
    // Unimos el li al ul
    ul.appendChild(li);
}

//AÑADIDO 

function editarUsuario(contacto) {
    // Completar el formulario con los datos del contacto
    form.elements.name.value = contacto.nombre;
    form.elements.email.value = contacto.email;
    form.elements.comments.value = contacto.mensaje;
    form.elements.image.value = contacto.imagen;

    // Cambiar el comportamiento del botón de submit
    const originalSubmit = form.querySelector('button[type="submit"]');
    originalSubmit.textContent = "Guardar"; // Cambiar el texto del botón a "Guardar"

    // Añadir un evento al botón para guardar los cambios
    originalSubmit.onclick = () => {
        if (confirm("¿Estás seguro de que deseas modificar el contacto?")) {
            // Actualizar el contacto
            let updatedContact = {
                nombre: form.elements.name.value,
                email: form.elements.email.value,
                mensaje: form.elements.comments.value,
                imagen: form.elements.image.value
            };
            // Guardar el contacto modificado
            contacts[contacts.findIndex(c => c.email === contacto.email)] = updatedContact;
            actualizarUsers(contacts);

            //vacía el formulario para poder agregar contactos de nuevo 
            form.reset();
            originalSubmit.textContent = "Agregar Contacto";

            // Actualizar el DOM
            const liToRemove = document.querySelector(`li[data-email="${contacto.email}"]`);
            if (liToRemove) {
                liToRemove.remove(); // Eliminar el antiguo del DOM
            }
            pintarUser(updatedContact);
        }

    };
}


// Crea botón para borrar todos los contactos guardados en Local Storage y en el DOM
form.addEventListener('reset', (event) => {
    event.preventDefault();
    const emailBorrar = event.target.elements.emailBorrar.value;

    // Si no se pone ningún email
    if (emailBorrar === '') {
        //Mostrar mensaje alerta
        if (confirm("¿Estás seguro de que desea eliminar todos los contactos?")) {
            // Borrar todos los contactos
            localStorage.removeItem("Contactos");
            // Borrar lo pintado en el DOM
            divLista.innerHTML = '';

        } else {
            // Si el usuario cancela, no hacer nada

        }
        // Si se pone un email
    } else {
        // Bajar todo del local storage
        let listUsers = getUsers();

        // Recuperar el índice del objeto que tenga ese email con findIndex
        // findIndex recorre un array y devuelve el índice del primer elemento que cumpla con una condición
        let indice = listUsers.findIndex(user => user.email === emailBorrar);
        listUsers.splice(indice, 1);

        // Mostrar mensaje de confirmación para borrar un contacto específico
        if (confirm(`¿Estás seguro de que quieres eliminar el contacto con email: ${emailBorrar}?`)) {
            // Borrar lo pintado en el DOM
            let liToRemove = document.querySelector(`li[data-email="${emailBorrar}"]`);
            if (liToRemove) {
                liToRemove.remove();  // Eliminar el <li> del DOM
            }
            // Volver a subir
            actualizarUsers(listUsers);

        } else {
            // Si el usuario cancela, no hacer nada
        }

    }
});
