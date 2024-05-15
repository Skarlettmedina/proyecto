
import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuario, loginUsuario, mostrarUsuario } from "../controllers/controller.usuario.js";
import {validarPermiso} from "../middlewares/middlewares.usuario.js"

const rutaUsuario = Router();

rutaUsuario.post("/usuario", crearUsuario);
rutaUsuario.get("/usuario/:id", mostrarUsuario);
rutaUsuario.get("/usuario",listarUsuario);
rutaUsuario.post("/login",loginUsuario);
rutaUsuario.put("/usuario",actualizarUsuario);
rutaUsuario.delete("/usuario", validarPermiso, eliminarUsuario);

export default rutaUsuario;