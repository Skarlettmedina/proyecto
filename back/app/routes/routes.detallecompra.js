import { Router } from "express";
import { crearDetalles, listarDetalles, mostrarDetalles } from "../controllers/controller.detallecompra.js";

const rutaDetalles = Router();

rutaDetalles.post("/detalle", crearDetalles);
rutaDetalles.get("/detalle/:id", mostrarDetalles);
rutaDetalles.get("/detalle", listarDetalles);

export default rutaDetalles;    