import { Router } from "express";
import { productos, registrarProductos } from "../controllers/controllers.productos.js";

const rutaProductos = Router();

rutaProductos.get("/productos", productos);
rutaProductos.get("/registrarProductos", registrarProductos);



export default rutaProductos;