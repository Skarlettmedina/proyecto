import { Router } from "express";
import { listarUsuario, registrarUsuario, salirUsuario } from "../controllers/controllers.usuario.js"
import {generar} from "../controllers/controller.informe.js"

const rutaUsuario = Router();

rutaUsuario.get("/usuario", listarUsuario);
rutaUsuario.get("/registrar", registrarUsuario);
rutaUsuario.get("/salir", salirUsuario);
rutaUsuario.get("/reporte", generar);

export default rutaUsuario;