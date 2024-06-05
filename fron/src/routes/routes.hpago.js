import { Router } from "express";
import { hpago } from "../controllers/controller.hpago.js";

const rutaHpago = Router();

rutaHpago.get("/hpago", hpago);

export default rutaHpago;