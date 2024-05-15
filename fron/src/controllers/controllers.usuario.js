export const listarUsuario = (req, res)=>{

   const url = "http://localhost:9000/api/usuario";
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data=>{

        res.render("views.usuario.ejs" , 
        {
            "titulo":"Usuarios Registrados" ,
            "data":data
        });
    })
    
    .catch(error=>console.error(error))

}
