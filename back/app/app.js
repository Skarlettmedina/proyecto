import express from "express";
import ruta from "./routes/index.js";
import cors from "cors";

const app = express();

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

//RUTAS
app.get("/", (req, res)=>{
    res.json({"mensaje":"Bienvenidos a la aplicación de los usuarios"});
});
app.use("/", ruta)


export default app;
    
