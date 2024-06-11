import jwt from "jsonwebtoken"
import { config } from "dotenv"
config();
export const tokenSing = (data) => { //PARA CREAR TOKENS
    return jwt.sign({
        idusuario: data.idusuario,
        email: data.email,
        roles: data.roles
    }, process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_TIMEEXPIRE
        })
}
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }
}
export const validarPermiso = (req, res, next) => {

    try {
        let token = req.headers["x-acces-token"];
        console.log(token);
        if (verifyToken(token) == null) {
            res.json({
                "error": "No tiene permiso para acceder",
                "method": "token invalido"
            })
        } else {
            next();
        }
    } catch (error) {
        res.json({
            "error": "error",
            "method": "token invalido"
        })
    }
}