import { config } from "dotenv";
import { ValidarToken } from "./controllers.usuario.js";

config();
export const mostrarDash = (req, res)=> {
    let token = "";
    const cookieToken = req.headers.cookie;
    const url = process.env.URL_BACK;
    if (cookieToken) {
        const cookies = cookieToken.split(';');
        // console.log(cookies);
        cookies.forEach(cookie => {
            const [nombre, valor] = cookie.split('=');
            if (nombre.trim() === 'token') { // reemplaza el nombre de la cookie
                token = valor;
            }
        });
    }
let datos = ValidarToken(token);
if (datos !== ""){
    res.render("views.dash.ejs", {"datos":datos});
    return;
}
res.redirect("/login.html");   
}