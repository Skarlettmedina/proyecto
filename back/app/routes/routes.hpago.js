import { Router } from "express";
import {validarPermiso} from "../middlewares/middlewares.usuario.js"
import { listarPagos, mostrarPago } from "../controllers/controller.hpago.js";

const rutaPago = Router();

rutaPago.get("/hpago", listarPagos);


export default rutaPago;