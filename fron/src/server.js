import express from "express";
import {config} from "dotenv";
import ejs from "ejs";
import ruta from "../src/routes/index";
config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');

app.set("port", process.env.PORT || 5000);

app.use(express.static(__dirname + '/public'));
app.use("/",ruta);

// Ruta para generar el reporte de compra
app.get("/reporte", async (req, res) => {
    try {
        const nombrep = req.query.nombrep;
        const cantidad = req.query.cantidad;


        // Ejemplo de generación de reporte en formato PDF usando la librería 'pdfkit'
        const PDFDocument = require('pdfkit');
        const fs = require('fs');

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('reporte.pdf'));
        doc.fontSize(25).text('Factura de Compra', {
            align: 'center'
        });
        doc.moveDown();
        doc.fontSize(15).text(`Nombre del Producto: ${nombrep}`);
        doc.fontSize(15).text(`Cantidad: ${cantidad}`);
        doc.end();

        res.download('reporte.pdf');

    } catch (error) {
        console.log("Error al generar el reporte:", error);
        res.status(500).json({ error: "Error al generar el reporte" });
    }
});

export default app;