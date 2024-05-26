import { Router } from "express";
import { productos } from "../controllers/controllers.productos.js";

const rutaProductos = Router();

rutaProductos.get("/productos", productos);

export default rutaProductos;