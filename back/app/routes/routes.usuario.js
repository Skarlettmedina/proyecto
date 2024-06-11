
import { Router } from "express";
import { actualizarUsuario, crearUsuario, eliminarUsuario, listarUsuario, loginUsuario, mostrarUsuario } from "../controllers/controller.usuario.js";
import {validarPermiso} from "../middlewares/middlewares.usuario.js"

const rutaUsuario = Router();

rutaUsuario.post("/usuario", validarPermiso, crearUsuario);
rutaUsuario.get("/usuario/:id", validarPermiso, mostrarUsuario);
rutaUsuario.get("/usuario",listarUsuario);
rutaUsuario.post("/login",loginUsuario);
rutaUsuario.post("/registro",crearUsuario);
rutaUsuario.put("/usuario", validarPermiso, actualizarUsuario);
rutaUsuario.delete("/usuario", validarPermiso, eliminarUsuario);

export default rutaUsuario;