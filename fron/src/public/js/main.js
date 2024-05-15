function eliminaRegistro(event) {
    const fila = event.target.parentNode.parentNode;
    const idProducto = fila.querySelector('td:first-child').innerText;

    // Realizar una solicitud DELETE al servidor para eliminar el registro
    fetch(`http://localhost:9000/api/productos/${idProducto}`, {
        method: 'DELETE'
    })
    .then(respuesta => respuesta.json())
    .then(data => {
        console.log(data); // Opcional: maneja la respuesta del servidor como desees
        // Eliminar la fila de la tabla en la interfaz de usuario
        fila.remove();
    })
    .catch(error => console.error(error));
}
