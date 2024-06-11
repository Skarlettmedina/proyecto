const registrarCompra = () => {
    const idusuario = 3; // Por ejemplo, obtén esto de un usuario autenticado
    const productos = [25, 30]; // IDs de los productos a comprar
    const cantidades = [2, 3]; // Cantidades de los productos
    const precios = [20000, 12000]; // Precios de los productos

    const url = "http://localhost:9000/api/compras/registrar";

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idusuario: idusuario,
            productos: productos,
            cantidades: cantidades,
            precios: precios
        })
    };

    fetch(url, options)
        .then(res => res.json())
        .then(data => {
            if (data.message) {
                alert('Compra registrada: ' + data.message);
            } else {
                alert('Error al registrar la compra: ' + (data.error || 'Error desconocido'));
            }
        })
        .catch(error => {
            alert("Error al registrar la compra: " + error.message);
        });
};
