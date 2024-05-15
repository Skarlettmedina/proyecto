import { Router} from "express";
import rutaUsuario from "./routes.usuario.js";
import rutaProductos from "./routes.productos.js";
import rutaFactura from "./routes.factura.js";
import rutaPago from "./routes.hpago.js";

const ruta = Router();

ruta.use("/api", rutaUsuario);
ruta.use("/api", rutaProductos);
ruta.use("/api", rutaFactura);
ruta.use("/api", rutaPago);


export default ruta;