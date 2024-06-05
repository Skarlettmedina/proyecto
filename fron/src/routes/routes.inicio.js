import { Router } from "express";
import { mostrarInicio } from "../controllers/controller.inicio.js";

const rutaInicio = Router();

rutaInicio.get("/inicio", mostrarInicio);

export default rutaInicio;