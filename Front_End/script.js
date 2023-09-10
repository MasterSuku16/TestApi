//fUNCION PARA LA FECHA
// function formatDate(dateString) {
//   const date = new Date(dateString);
//   if (date.toString() === "Invalid Date") {
//     return dateString; // Si la fecha no es válida, muestra el valor original
//   }
//   const options = { year: "numeric", month: "2-digit", day: "2-digit" };
//   return date.toLocaleDateString(undefined, options);
// }
function formatDate(dateString) {
    const date = new Date(dateString);
    if (date.toString() === "Invalid Date") {
      return dateString; // Si la fecha no es válida, muestra el valor original
    }
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return date.toLocaleDateString("en-CA", options); // Formato "aaaa-mm-dd" (ISO 8601)
  }
//GET
function listarDatos() {
  fetch("http://localhost:5298/api/Comment")
    .then((response) => response.json())
    .then((data) => {
      const dataTable = document.getElementById("data-table");
      dataTable.innerHTML = ""; // Limpiar la tabla antes de agregar datos nuevos

      data.forEach((dato) => {
        const row = document.createElement("tr");
        row.innerHTML = `
              <td>${dato.id}</td>
              <td>${dato.title}</td>
              <td>${dato.description}</td>
              <td>${dato.author}</td>
              <td>${formatDate(dato.createdAt)}</td> <!-- Formatear la fecha -->
              <td>
        <button type="button" class="btn btn-success" onclick="abrirModalEditar('${dato.id}', '${dato.title}', '${dato.description}', '${dato.author}', '${dato.createdAt}')">Editar</button>
        <button type="button" class="btn btn-danger" onclick="mostrarModalEliminar('${dato.id}')">Eliminar</button>
      </td>
            `;
        dataTable.appendChild(row);
      });
    })
    .catch((error) => console.error("Error al obtener los datos:", error));
}
listarDatos();
//***************************************************************************** */

//POST
function agregarDato(event) {
  event.preventDefault();

  const idComment = document.getElementById("id").value;
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const author = document.getElementById("author").value;
  const createdAt = document.getElementById("createdAt").value; // Obtener el valor del campo de fecha

  const isoDate = new Date(createdAt).toISOString();
  const nuevoDato = {
    id: idComment,
    title: title,
    description: description,
    author: author,
    createdAt: isoDate, // Utilizar la propiedad 'createdAt' para almacenar la fecha
  };

  fetch("http://localhost:5298/api/Comment/Store/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nuevoDato),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Nuevo dato agregado:", data);
      listarDatos(); // Actualizar la tabla con los nuevos datos

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "El dato se ha registrado correctamente.",
      });
    })
    .catch((error) => console.error("Error al agregar el dato:", error));
}

//editar un dato
function abrirModalEditar(id, title, description, author, createdAt) {
document.getElementById("edit-id").value = id;
  document.getElementById("edit-title").value = title;
  document.getElementById("edit-description").value = description;
  document.getElementById("edit-author").value = author;

const formattedDate = formatDate(createdAt);
  const [year, month, day] = formattedDate.split("-"); // Obtener año, mes y día
  const formattedDateToShow = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Formato "aaaa-mm-dd"
  document.getElementById("edit-date").value = formattedDateToShow;

    // Show the modal
    const modal = document.getElementById("abrirModalEditar");
    modal.style.display = "block";
  
    // Add event listener for the "Guardar Cambios" button
    const guardarCambiosBtn = document.querySelector("#abrirModalEditar button[type='submit']");
    guardarCambiosBtn.addEventListener("click", guardarCambios);
  }

function cerrarModal() {
  // Ocultar el modal y restablecer la variable idElementoEditar
  const modal = document.getElementById("abrirModalEditar");
  modal.style.display = "none";
  idElementEditar = null;

  // Verificar si el elemento form existe antes de agregar el evento submit
  const form = document.querySelector("#abrirModalEditar form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
  }
}

function guardarCambios() {
  // Obtener los valores actualizados del formulario
  console.log("guardarCambios() ejecutada");
  const id = document.getElementById("edit-id").value;
  const title = document.getElementById("edit-title").value;
  const description = document.getElementById("edit-description").value;
  const author = document.getElementById("edit-author").value;
  const createdAt = document.getElementById("edit-date").value;
  const isoDate = new Date(createdAt).toISOString();

  // Crear un objeto con los cambios
  const cambios = {
    id: id,
    title: title,
    description: description,
    author: author,
    createdAt: createdAt
  };

  // Enviar una solicitud PUT al servidor para actualizar el elemento
  fetch(`http://localhost:5298/api/Comment/Update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cambios)
  })
    .then(() => {
        listarDatos(); // Actualizar la tabla con los nuevos datos
      cerrarModal(); // Cerrar el modal después de guardar los cambios
      console.log("exito en el cambio");

      alert("Comentario editado");
    })
    // .catch((error) => console.log("Error al guardar cambios:", error));
}


function eliminarDato(id) {
    fetch(`http://localhost:5298/api/Comment/Destroy?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    })
      .then(() => {
        listarDatos(); // Actualizar la tabla después de eliminar el dato
        cerrarModalEliminar(); // Cerrar el modal de confirmación de eliminación
        Swal.fire({
            icon: "success",
            title: "Eliminación exitosa",
            text: "El comentario ha sido eliminado.",
          });
      })
      .catch((error) => console.log("Error al eliminar el dato:", error));
  }
  
  function mostrarModalEliminar(id) {
    const modal = document.getElementById("confirmarModalEliminar");
    const confirmarBtn = document.getElementById("confirmarEliminar");
  
    confirmarBtn.onclick = function () {
      eliminarDato(id);
    };
  
    modal.style.display = "block";
  }
  
//   function cerrarModalEliminar() {
//     const modal = document.getElementById("");
//     modal.style.display = "none";
//   }
function cerrarModalEliminar() {
    // Ocultar el modal y restablecer la variable idElementoEditar
    const modal = document.getElementById("confirmarModalEliminar");
    modal.style.display = "none";
    idElementEditar = null;
  
  }
  