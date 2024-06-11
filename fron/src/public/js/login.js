const logueese = () => {
    const email = document.getElementById("email");
    const contrasena = document.getElementById("contrasena");

    console.log(email.value);
    let option = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "email": email.value,
            "contrasena": contrasena.value
        })
    };

    let url = "http://localhost:9000/api/login";

    fetch(url, option)
        .then(res => res.json())
        .then(data => {
            document.cookie = `token=${data.token}`;
            if (data.token !== undefined) {
                window.location.href = "/dash";
                console.log(data.token);
            } else {
                alertify.error('Clave Incorrecta');
            }
        })
        .catch(error => console.error(error.message))
};

const registrarUsuario2 = () => {
    const usuario = document.getElementById('reg_usuario').value;
    const email = document.getElementById('reg_email').value;
    const contrasena = document.getElementById('reg_contrasena').value;
    const regex = /^[a-zA-Z0–9._-]+@[a-zA-Z0–9.-]+\.[a-zA-Z]{2,4}$/;
    if (!regex.test(email)) {
        alert('Email no valido');
        return
    }

    const url = "http://localhost:9000/api/registro";

    const headers = {
        'Content-Type': 'application/json'
    };

    const options = {
        method: "POST",
        body: JSON.stringify({
            idusuario: null,
            usuario: usuario,
            email: email,
            contrasena: contrasena,
            roles: 'Usuario'  // Asignar un rol por defecto
        }),
        headers: headers
    };
console.log(options);
    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (data.code) {
                alert('Registro guardado: ' + data.respuesta);
            } else {
                alert('Error al guardar registro: ' + (data.error || 'Error desconocido'));
            }
        })
        .catch(error => {
            alert("Error al guardar registro: " + error.message);
        });
};

