import { Router } from "express";
import {validarPermiso} from "../middlewares/middlewares.usuario.js"
import {actualizarProductos, crearProductos, eliminarProductos, listarProductos, mostrarProductos } from "../controllers/controller.productos.js";

const rutaProductos = Router();

rutaProductos.post("/productos", crearProductos);
rutaProductos.get("/productos/:id", mostrarProductos);
rutaProductos.get("/productos",listarProductos);
rutaProductos.put("/productos",actualizarProductos);
rutaProductos.delete("/productos/:id", validarPermiso, eliminarProductos);

export default rutaProductos;