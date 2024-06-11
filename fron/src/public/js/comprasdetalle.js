//Para salir de la aplicación
const salirUsuario = () => {
    document.cookie = "token=";
    window.location.href = "/salir"
}
//Para Registrar un nuevo producto
const registrarCompras = () => {
    const iddetalle = document.getElementById('iddetalle').value;
    const idcompra = document.getElementById('idcompra').value;
    const idproducto = document.getElementById('idproducto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;


console.log(registrarCompras);

    const url = "http://localhost:9000/api/detalle/"

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
        alert("Debe Realizar la compra nuevamente");
        return
    }
    if (token == "") {
        alert("Debe Realizar la compra nuevamente");
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
            iddetalle,
            idcompra,
            idproducto,
            cantidad,
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
function cargarCompras(event) {
    document.getElementById('iddetalle').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('idcompra').value = event.target.parentElement.parentElement.children[1].innerHTML;
    document.getElementById('idproducto').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('cantidad').value = event.target.parentElement.parentElement.children[3].innerHTML;
    document.getElementById('precio').value = event.target.parentElement.parentElement.children[4].innerHTML;

    
}
// Función para comprar el producto
function comprarProducto() {
    const iddetalle = document.getElementById('iddetalle').value;
    const idcompra = document.getElementById('idcompra').value;
    const idproducto = document.getElementById('idproducto').value;
    const cantidad = document.getElementById('cantidad').value;
    const precio = document.getElementById('precio').value;

    const url = "http://localhost:9000/api/detalle";
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
        method: "POST",
        body: JSON.stringify({
            iddetalle,
            idcompra,
            idproducto,
            cantidad,
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


