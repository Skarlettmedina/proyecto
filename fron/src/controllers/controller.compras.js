export const compras = (req, res)=>{

    const url = "http://localhost:9000/api/compras";
     
     fetch(url)
     .then(respuesta => respuesta.json())
     .then(data=>{
 
         res.render("views.compras.ejs" , 
         {
             "datos":"compras",
             "data":data
         });
     })
     
     .catch(error=>console.error(error))
 }

