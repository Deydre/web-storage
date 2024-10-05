// If el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado contactos
if (!localStorage.getItem("Contactos")) {
    localStorage.setItem("Contactos", JSON.stringify([]));
}

// Acceder al form y div del body y guardarlos
let form = document.querySelector('form');
let divLista = document.querySelector("#divLista");
let contacts = getUsers();   // Cargar contactos existentes
let ul = document.createElement("ul");
divLista.appendChild(ul);

let editing = false; // Variable para controlar si estamos editando o creando
let currentEmail = ''; // Variable para almacenar el email del contacto a modificar

// Evento de submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Accedemos a cada input del formulario
    let nombre = event.target.elements.name.value;
    let email = event.target.elements.email.value;
    let mensaje = event.target.elements.comments.value;
    let imagen = event.target.elements.image.value;

    // Crear objeto del contacto
    let contact = {
        nombre: nombre,
        email: email,
        mensaje: mensaje,
        imagen: imagen
    };

    // Verificar si estamos editando o creando
    if (editing) {
        // Si estamos editando, modificar el contacto existente
        const index = contacts.findIndex(currentContact => currentContact.email === currentEmail);
        contacts[index] = contact;
        editing = false;
        currentEmail = '';

        // Cambiar texto del botón de vuelta a "Agregar contacto"
        form.querySelector('button[type="submit"]').textContent = "Agregar contacto";

        // Actualizar el contacto en el DOM
        const liToRemove = document.querySelector(`li[data-email="${contact.email}"]`);
        // Si existe la tarjeta concreta, eliminarla
        liToRemove ? liToRemove.remove() : ""; 
    } else {
        // Si estamos creando, simplemente agregamos el nuevo contacto
        contacts.push(contact);
    }

    // Actualizar el localStorage
    actualizarUsers(contacts);

    // Pintar el contacto en el DOM
    pintarUser(contact);

    // Limpiar el formulario
    form.reset();
});

// Función para actualizar los contactos en localStorage
function actualizarUsers(contacts) {
    localStorage.setItem("Contactos", JSON.stringify(contacts));
}

// Función para obtener los contactos de localStorage
function getUsers() {
    let usersStorage = localStorage.getItem("Contactos");
    return JSON.parse(usersStorage);
}

// Función para pintar un contacto en una tarjeta
function pintarUser(contacto) {
    let li = document.createElement("li");
    li.setAttribute("data-email", contacto.email);

    let nombre1 = document.createElement("p");
    nombre1.textContent = `Nombre: ${contacto.nombre}`;

    let email1 = document.createElement("p");
    email1.textContent = `Email: ${contacto.email}`;

    let mensaje1 = document.createElement("p");
    mensaje1.textContent = `Mensaje: ${contacto.mensaje}`;

    let imagen1 = document.createElement("p");
    imagen1.textContent = `Imagen de ${contacto.nombre}`;

    // Crear icono para editar
    let editIcon = document.createElement("span");
    editIcon.textContent = "✏️";
    editIcon.style.cursor = "pointer";
    editIcon.style.marginLeft = "10px";

    // Añadir evento para editar el contacto
    editIcon.addEventListener("click", () => {
        editarUsuario(contacto);
    });

    // Unir los elementos al li
    li.appendChild(nombre1);
    li.appendChild(email1);
    li.appendChild(mensaje1);
    li.appendChild(imagen1);
    li.appendChild(editIcon);

    // Añadir el li al ul
    ul.appendChild(li);
}

// Función para editar un contacto
function editarUsuario(contacto) {
    // Rellenar el formulario con los datos del contacto
    form.elements.name.value = contacto.nombre;
    form.elements.email.value = contacto.email;
    form.elements.comments.value = contacto.mensaje;
    form.elements.image.value = contacto.imagen;

    // Cambiar el texto del botón a "Guardar cambios"
    form.querySelector('button[type="submit"]').textContent = "Guardar cambios";

    // Marcar que estamos en modo edición
    editing = true;
    currentEmail = contacto.email;
}

// Botón para borrar contactos
let deleteButton = document.querySelector('#botonBorrar');
deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const emailBorrar = form.elements.emailBorrar.value;

    if (emailBorrar === '') {
        if (confirm("¿Estás seguro de que desea eliminar todos los contactos?")) {
            localStorage.removeItem("Contactos");
            divLista.innerHTML = '';
            contacts = [];
        }
    } else {
        let indice = contacts.findIndex(user => user.email === emailBorrar);
        if (indice !== -1) {
            contacts.splice(indice, 1);
            if (confirm(`¿Estás seguro de que quieres eliminar el contacto con email: ${emailBorrar}?`)) {
                let liToRemove = document.querySelector(`li[data-email="${emailBorrar}"]`);
                if (liToRemove) {
                    liToRemove.remove();
                }
                actualizarUsers(contacts);
            }
        }
    }
});
