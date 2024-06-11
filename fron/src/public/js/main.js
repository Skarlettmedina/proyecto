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
//Para Registrar un nuevo Usuario
const registrarUsuario = () => {
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const roles = document.getElementById('roles').value;
    const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
        alert('Email no valido');
        return
    }


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
            contrasena,
            roles
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
//Cargar pagina cuando edite un usuario
const cargarUsuario = (event) => {
    console.log(event.target.parentElement.parentElement.children[0].innerHTML);


    document.getElementById('idusuario').value = event.target.parentElement.parentElement.children[0].innerHTML;
    document.getElementById('usuario').value = event.target.parentElement.parentElement.children[2].innerHTML;
    document.getElementById('email').value = event.target.parentElement.parentElement.children[3].innerHTML;
    document.getElementById('contrasena').value = event.target.parentElement.parentElement.children[4].innerHTML;
    document.getElementById('roles').value = event.target.parentElement.parentElement.children[5].innerHTML;

}

//Para modificar un Registro
const modificarUsuario = () => {
    const idusuario = document.getElementById('idusuario').value;
    const usuario = document.getElementById('usuario').value;
    const email = document.getElementById('email').value;
    const contrasena = document.getElementById('contrasena').value;
    const roles = document.getElementById('roles').value;
    const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
        alert('Email no valido');
        return
    }


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
            contrasena,
            roles
        }),
        headers
    }
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            alert('Registro guardado' + data);
            console.log(data);
        })
        .catch(error => {
            alert("Error al guardar registro", error);
        })
}
//Para que funcione el borrar
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

    const url = "http://localhost:9000/api/usuario";
    const option = {
        method: "DELETE",
        body: JSON.stringify({ "idusuario": codigo }),
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
