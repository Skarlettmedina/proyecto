import { Router } from "express";
import { listarUsuario, registrarUsuario, salirUsuario } from "../controllers/controllers.usuario.js"

const rutaUsuario = Router();

rutaUsuario.get("/usuario", listarUsuario);
rutaUsuario.get("/registrar", registrarUsuario);
rutaUsuario.get("/salir", salirUsuario);

export default rutaUsuario;