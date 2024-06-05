import { Router } from "express";
import {validarPermiso} from "../middlewares/middlewares.usuario.js"
import { crearFactura, listarFacturas, mostrarFactura } from "../controllers/controller.factura.js";

const rutaFactura = Router();

rutaFactura.post("/factura", crearFactura);
rutaFactura.get("/factura/:id", mostrarFactura);
rutaFactura.get("/factura",listarFacturas);


export default rutaFactura;