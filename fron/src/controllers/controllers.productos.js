export const productos = (req, res)=>{

   const url = "http://localhost:9000/api/productos";
    
    fetch(url)
    .then(respuesta => respuesta.json())
    .then(data=>{

        res.render("views.productos.ejs" , 
        {
            "titulo":"Lista de Productos" ,
            "data":data
        });
    })
    
    .catch(error=>console.error(error))
    

}
 