import { Router } from "express";

import rutaUsuario from "./routes.usuario.js";
import rutaDash from "./routes.dash.js"
import rutaProductos from "./routes.productos.js";
import rutaFactura from "./routes.factura.js";
import rutaHpago from "./routes.hpago.js";

const ruta = Router();

ruta.use("/",rutaUsuario)
ruta.use("/",rutaDash)
ruta.use("/",rutaProductos)
ruta.use("/",rutaFactura)
ruta.use("/",rutaHpago)



export default ruta;