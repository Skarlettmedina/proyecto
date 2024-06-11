import { Router } from "express";
import { crearCompra, eliminarCompra, listarCompra, mostrarCompra } from "../controllers/controller.compras.js";

const rutaCompras = Router();

rutaCompras.post("/compras", crearCompra);
rutaCompras.get("/compras/:id", mostrarCompra);
rutaCompras.get("/compras", listarCompra);
rutaCompras.delete("/compras", eliminarCompra);

export default rutaCompras;