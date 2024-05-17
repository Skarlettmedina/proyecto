import jwt from 'jsonwebtoken';
import { config } from "dotenv";
config();
export const listarUsuario = (req, res)=>{

   const url = process.env.URL_BACK + "/usuario";
    
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
export const registrarUsuario = (req, res)=>{
    res.render("views.usuario.registro.ejs", {"datos":"skarlett"});
}
export const ValidarToken = (token) => {
    let respuesta = "";
    const secret = process.env.JWT_SECRET;
    if (!token){
        return "";
    }
    
    jwt.verify(token, secret, (error, decodedToken) => {
        if (error) {
            console.error('Error al verificar el token:', error)
                return "";
            }else{
                respuesta=decodedToken;
            }
        });
        return respuesta;
    }
export const salirUsuario = (req, res) => {
    res.redirect("/login.html");

}