import { Router } from "express";
import { listarUsuario } from "../controllers/controllers.usuario"

const rutaUsuario = Router();

rutaUsuario.get("/usuario", listarUsuario);

export default rutaUsuario;