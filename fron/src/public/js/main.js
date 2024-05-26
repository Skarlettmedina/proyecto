const eliminarRegistro = async (event) => {
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
            if (borrar(event)) {
                await Swal.fire({
                    title: "Eliminado!",
                    text: "El registro ha sido eliminado",
                    icon: "success"
                });
                window.location.href="/usuario";
            } else {
                console.log("no lo mostró verdadero");
            }
        }
    } catch (error) {
        console.log("Error al eliminar el registro", error);
    }
};

//Para salir de la aplicación
const salirUsuario = () => {
    document.cookie = "token=";
    window.location.href = "/salir"
}
const registrarUsuario = () => {
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;


    const url = "http://localhost:9000/api/usuario"

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
            "idusuario": null,
            usuario,
            email,
            contrasena
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
const cargarUsuario = (event) => {
    console.log(event.target.parentElement.parentElement.children[0].innerHTML);


    document.getElementById('idusuario').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('usuario').value = event.target.parentElement.parentElement.children[1].innerHTML;
    document.getElementById('email').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('contrasena').value = event.target.parentElement.parentElement.children[3].innerHTML;
}
const modificarUsuario = () => {
    const idusuario = document.getElementById('idusuario').value;
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;


    const url = "http://localhost:9000/api/usuario"
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
        method: "PUT",
        body: JSON.stringify({
            "idusuario": idusuario,
            usuario,
            email,
            contrasena
        }),
        headers
    }
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            alert('Registro guardado' + data);
        })
        .catch(error => {
            alert("Error al guardar registro", error);
        })
}
const borrar = async (event) => {
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
        method: "PUT",
        body: JSON.stringify({
            "idusuario": idusuario,
            usuario,
            email,
            contrasena
        }),
        headers
    }

    let retorno = false;

    const url = "http://localhost:9000/api/usuario";
    const option = {
        method: "DELETE",
        body: JSON.stringify({ "idusuario": codigo }),
        headers
    }
    await fetch(url, option)
        .then(res => res.json())
        .then(data =>{
            if (data.respuesta){
                console.log(data.respuesta);
                retorno = true
            }
        })
        .catch(error => alert(error))
        console.log(retorno);
    return retorno;
}