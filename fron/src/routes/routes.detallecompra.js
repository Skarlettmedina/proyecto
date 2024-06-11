import { Router } from "express";
import { detalle } from "../controllers/controller.detallecompra.js";

const rutaDetalles = Router();

rutaDetalles.get("/detalle", detalle);

export default rutaDetalles;