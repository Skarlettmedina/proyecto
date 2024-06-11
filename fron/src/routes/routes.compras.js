import { Router } from "express";
import { compras } from "../controllers/controller.compras.js";

const rutaCompras = Router();

rutaCompras.get("/compras", compras);

export default rutaCompras;