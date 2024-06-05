import { Router } from "express";
import { factura } from "../controllers/controller.factura.js";

const rutaFactura = Router();

rutaFactura.get("/factura", factura);

export default rutaFactura;