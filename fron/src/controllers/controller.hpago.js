export const hpago = (req, res)=>{

    const url = "http://localhost:9000/api/hpago";
     
     fetch(url)
     .then(respuesta => respuesta.json())
     .then(data=>{
 
         res.render("views.hpago.ejs", 
         {
             "datos":"Historial de Productos" ,
             "data":data
         });
     })
     
     .catch(error=>console.error(error))
 }
  