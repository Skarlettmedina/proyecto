const eliminarProducto = async (event) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"
        });

        if (result.isConfirmed) {
            const borradoExitoso = await borrarProducto(event);
            if (borradoExitoso) {
                await Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado",
                    icon: "success"
                });
                window.location.href = "/productos";
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "No se pudo eliminar el registro",
                    icon: "error"
                });
            }
        }
    } catch (error) {
        console.log("Error al borrar el registro", error);
    }
};

//Para Registrar un nuevo producto
const registrarProductos = () => {
    const nombrep = document.getElementById('nombrep').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
console.log(registrarProductos);

    const url = "http://localhost:9000/api/productos"

    let token = "";
    const cookieToken = document.cookie;

    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {
                token = valor;
            }
        });
    } else {
        alert("Debe registrarse nuevamente");
        return
    }
    if (token == "") {
        alert("Debe registrarse nuevamente");
        return
    }
    const headers = {
        'x-acces-token': token,
        'Content-Type': 'application/json'
    };
    const options = {
        method: "POST",
        body: JSON.stringify({
            "idproducto": null,
            nombrep,
            color,
            precio
        }),
        headers
    }
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Registro guardado' + data);
        })
        .catch(error => {
            alert("Error al guardar registro", error);
        })
}

//Para modificar un producto
function cargarProducto(id, nombre, color, precio) {
    document.getElementById('idproducto').value = id;
    document.getElementById('nombrep').value = nombre;
    document.getElementById('color').value = color;
    document.getElementById('precio').value = precio;
}

// Función para modificar el producto
function modificarProducto() {
    const idproducto = document.getElementById('idproducto').value;
    const nombrep = document.getElementById('nombrep').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;

    const url = "http://localhost:9000/api/productos";
    let token = "";
    const cookieToken = document.cookie;

    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {
                token = valor;
            }
        });
    } else {
        alert("Debe registrarse nuevamente");
        return;
    }

    if (token == "") {
        alert("Debe registrarse nuevamente");
        return;
    }

    const headers = {
        'x-acces-token': token,
        'Content-Type': 'application/json'
    };

    const options = {
        method: "PUT",
        body: JSON.stringify({
            idproducto,
            nombrep,
            color,
            precio
        }),
        headers
    };

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                alert('Registro guardado: ' + JSON.stringify(data));
                location.reload(); // Recarga la página para ver los cambios
            }
        })
        .catch(error => {
            alert("Error al guardar registro: " + error.message);
        });
}

//Para que funcione 
const borrarProducto = async (event) => {
    const codigo = event.target.parentElement.parentElement.children[0].innerHTML;

    let token = "";
    const cookieToken = document.cookie;

    if (cookieToken) {
        const cookies = cookieToken.split(';');
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') {
                token = valor;
            }
        });
    } else {
        alert("Debe registrarse nuevamente");
        return false;
    }

    if (token === "") {
        alert("Debe registrarse nuevamente");
        return false;
    }

    const headers = {
        'x-access-token': token,
        'Content-Type': 'application/json'
    };

    const url = `http://localhost:9000/api/productos/${codigo}`; // Cambia a la URL correcta
    const options = {
        method: "DELETE",
        headers
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (response.ok) {
            return true;
        } else {
            console.log("Error en la respuesta del servidor:", data.message || "Error desconocido");
            return false;
        }
    } catch (error) {
        console.log("Error en la petición:", error);
        return false;
    }
};