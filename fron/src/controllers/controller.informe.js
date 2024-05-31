import { create } from 'html-pdf';
import { exec } from 'child_process';

export const generar = async (req, res) => {

  //Los campos que enviaran desde su pagina
  const usuario = req.query.usuario;
  const email = req.query.email;
  const roles = req.query.roles;

  // HTML que quieres convertir a PDF
  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Carta de Ascenso</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;
    }
    .header-image {
      position: absolute;
      top: 0;
      right: 0;
      max-width: 150px;
      height: auto;
    }
    .header-bar {
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 100%;
      background-color: #4CAF50; /* Cambia este color si deseas otro */
    }
    .footer-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 10px;
      height: 100%;
      background-color: #4CAF50; /* Cambia este color si deseas otro */
    }
    h2 {
      color: #333;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    .contact-info {
      margin-top: 20px;
    }
    .contact-info p {
      margin: 5px 0;
    }
    .contact-info p span {
      font-weight: bold;
    }
  </style>
  </head>
  <body>
 
  <div class="container">
    <div class="header-bar"></div>
    <div class="footer-bar"></div>
    <img src="ruta/a/la/imagen.jpg" alt="Imagen" class="header-image">
    <h2>Carta de Ascenso</h2>
    <p>Estimado/a Johan Lujan,</p>
    <p>Nos complace informarte que has sido seleccionado/a para un ascenso dentro de nuestra empresa. Tu arduo trabajo, dedicación y contribuciones significativas han sido reconocidas y valoradas por todo el equipo.</p>
    <p>El nuevo puesto, [Nombre del Nuevo Puesto], te brindará mayores responsabilidades y oportunidades de crecimiento profesional.</p>
    <p>Por favor, encuentra a continuación tus datos de contacto actualizados:</p>
    <div class="contact-info">
      <p><span>usuario:</span> ${usuario}</p>
      <p><span>email:</span> ${email}</p>
      <p><span>roles:</span> ${roles}</p>
    </div>
    <p>Te felicitamos nuevamente por este logro y esperamos que continúes teniendo éxito en tu trayectoria con nosotros.</p>
    <p>Atentamente,</p>
    <p>Skarlett<br>
    Aministradora<br>
    CrochetSM</p>
  </div>
 
  </body>
  </html>
 `;


  // Opciones para la generación del PDF
  const options = { format: 'Letter' }; // Formato de página


  // Convertir HTML a PDF
  const name = await create(htmlContent, options).toFile(`./documento${usuario}.pdf`, function (err, res) {
    if (err) {
      return console.log(err);
    }
    // Abrir el archivo PDF en una nueva ventana después de crearlo
    exec(`start /B ./documento${usuario}.pdf`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error al abrir el archivo: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Archivo PDF abierto correctamente.`);
    });
  });
}
