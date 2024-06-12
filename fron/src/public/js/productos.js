const eliminarProducto = async (event) => {
    try {
        const result = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esto no se revertira!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, estoy seguro!"

        });
        if (result.isConfirmed) {
            if (await borrarProducto(event)) {
                await Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado",
                    icon: "success"
                });
                window.location.href = "/productos";
            } else {
                console.log("No se pudo eliminar el producto");
            }
        }
    } catch (error) {
        console.log("Error al eliminar el registro", error);
    }
};

// Para salir de la aplicación
const salirUsuario = () => {
    document.cookie = "token=";
    window.location.href = "/salir";
};

// Para registrar un nuevo producto
const registrarProductos = () => {
    const nombrep = document.getElementById('nombrep').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

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
    if (token === "") {
        alert("Debe registrarse nuevamente");
        return;
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
            precio,
            stock
        }),
        headers
    };
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            alert('Registro guardado: ' + data);
        })
        .catch(error => {
            alert("Error al guardar registro", error);
        });
};

// Para modificar un producto
function cargarProducto(event) {
    const parent = event.target.parentElement.parentElement.children;
    document.getElementById('idproducto').value = parent[0].innerHTML;
    document.getElementById('nombrep').value = parent[2].innerHTML;
    document.getElementById('color').value = parent[3].innerHTML;
    document.getElementById('precio').value = parent[4].innerHTML;
    document.getElementById('stock').value = parent[5].innerHTML;
}

function cargarCompra(event) {
    const parent = event.target.parentElement.parentElement.children;
    document.getElementById('nombrepcompra').value = parent[2].innerHTML;
    document.getElementById('preciocompra').value = parent[4].innerHTML;
    document.getElementById('cantidadcompra').value = 1; // Inicializa en 1
    calcularTotalCompra();
}

function calcularTotalCompra() {
    const precio = parseFloat(document.getElementById('preciocompra').value);
    const cantidad = parseInt(document.getElementById('cantidadcompra').value);
    const total = precio * cantidad;
    document.getElementById('totalcompra').innerText = `Total: $${total.toFixed(2)}`;
}

// Función para comprar productos
const comprarProducto = () => {
    const nombrep = document.getElementById('nombrepcompra').value;
    const cantidad = document.getElementById('cantidadcompra').value;
    const precio = document.getElementById('preciocompra').value;

    const url = `/factura?nombrep=${nombrep}&precio=${precio}`;
    window.open(url);
};

// Función para modificar el producto
function modificarProducto() {
    const idproducto = document.getElementById('idproducto').value;
    const nombrep = document.getElementById('nombrep').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

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

    if (token === "") {
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
            precio,
            stock
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
                location.reload();
            }
        })
        .catch(error => {
            alert("Error al guardar registro: " + error.message);
        });
}

// Para que funcione 
const borrarProducto = async (event) => {
    let codigo = event.target.parentElement.parentElement.children[0].innerHTML;

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
        'x-acces-token': token,
        'Content-Type': 'application/json'
    };

    const url = "http://localhost:9000/api/productos";
    const option = {
        method: "DELETE",
        body: JSON.stringify({ "idproducto": codigo }),
        headers
    };

    let retorno = false;

    try {
        console.log("1");
        const response = await fetch(url, option);
        console.log("2");
        const data = await response.json();
        console.log("3");
        if (data.respuesta) {
            console.log(data.respuesta);
            retorno = true;
        }else{
            console.log("4");
        }
    } catch (error) {
        console.log("Error en la petición:", error);
    }

    console.log("Retorno:", retorno);
    return retorno;
};
