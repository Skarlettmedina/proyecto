// Ruta para generar el factura de compra
app.get("/factura", async (req, res) => {
    try {
        const precio = req.query.precio;
        const nombrep = req.query.nombrep;


        // Ejemplo de generación de factura en formato PDF usando la librería 'pdfkit'
        const PDFDocument = require('pdfkit');
        const fs = require('fs');

        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream('factura.pdf'));
        doc.fontSize(25).text('Factura de Compra CrochetSM', {
            align: 'center'
        });
        doc.moveDown();
        doc.fontSize(15).text(`Nombre del Producto: ${nombrep}`);
        doc.fontSize(15).text(`Precio: ${precio}`);
        doc.end();

        res.download('factura.pdf');

    } catch (error) {
        console.log("Error al generar el factura:", error);
        res.status(500).json({ error: "Error al generar el factura" });
    }
});