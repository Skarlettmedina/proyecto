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
            if (borrarProducto(event)) {
                await Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado",
                    icon: "success"
                });
                window.location.href="/productos";
            } else {
                console.log("no lo mostró verdadero");
            }
        }
    } catch (error) {
        console.log("Error al eliminar el registro", error);
    }
};


//Para Registrar un nuevo producto
const registrarProductos = () => {
    const nombrep = document.getElementById('nombrep').value;
    const color = document.getElementById('color').value;
    const precio = document.getElementById('precio').value;
    const stock = document.getElementById('stock').value;

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
            "idproducto": idproducto,
            nombrep,
            color,
            precio,
            stock
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
function cargarProducto(event) {
    document.getElementById('idproducto').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('nombrep').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('color').value = event.target.parentElement.parentElement.children[3].innerHTML;
    document.getElementById('precio').value = event.target.parentElement.parentElement.children[4].innerHTML;
    
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
                location.reload();
            }
        })
        .catch(error => {
            alert("Error al guardar registro: " + error.message);
        });
}

//Para que funcione 
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
