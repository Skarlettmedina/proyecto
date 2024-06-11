import { Router} from "express";
import rutaUsuario from "./routes.usuario.js";
import rutaProductos from "./routes.productos.js";
import rutaDetalles from "./routes.detallecompra.js";
import rutaCompras from "./routes.compras.js";

const ruta = Router();

ruta.use("/api", rutaUsuario);
ruta.use("/api", rutaProductos);
ruta.use("/api", rutaDetalles);
ruta.use("/api", rutaCompras);

export default ruta;