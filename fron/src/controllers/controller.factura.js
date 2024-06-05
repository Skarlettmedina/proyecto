export const factura = (req, res)=>{

    const url = "http://localhost:9000/api/factura";
     
     fetch(url)
     .then(respuesta => respuesta.json())
     .then(data=>{
 
         res.render("views.factura.ejs", 
         {
             "datos":"Facturas realizadas" ,
             "data":data
         });
     })
     
     .catch(error=>console.error(error))
     
 
 }
  