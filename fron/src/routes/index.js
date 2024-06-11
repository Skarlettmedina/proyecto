import { Router } from "express";

import rutaUsuario from "./routes.usuario.js";
import rutaDash from "./routes.dash.js"
import rutaProductos from "./routes.productos.js";
import rutaCompras from "./routes.compras.js";
import rutaDetalles from "./routes.detallecompra.js";


const ruta = Router();

ruta.use("/",rutaUsuario)
ruta.use("/",rutaDash)
ruta.use("/",rutaProductos)
ruta.use("/",rutaCompras)
ruta.use("/",rutaDetalles)


export default ruta;