import { Router } from "express";
import { mostrarDash } from "../controllers/controller.dash.js";

const rutaDash = Router();

rutaDash.get("/dash", mostrarDash);

export default rutaDash;