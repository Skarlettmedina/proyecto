import { Router } from "express";
import { productos } from "../controllers/controllers.productos";

const rutaProductos = Router();

rutaProductos.get("/productos", productos);

export default rutaProductos;