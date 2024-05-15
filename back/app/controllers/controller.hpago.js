import { pool } from "../config/db_mysql.js";

export const crearPago = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            INSERT INTO hpago(idfactura, idpagos) VALUES (
                ${info.idfactura},
                ${info.idpagos}
            )
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Pago registrado correctamente"
            });
        } else {
            res.json({
                respuesta: "No se registró el pago"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            method: "post"
        });
    }
};

export const mostrarPago = async (req, res) => {
    let id = req.params.id;

    try {
        const resultado = await pool.query(
            `SELECT * FROM hpago WHERE idpagos = ?`, 
            [id]
        );
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
};

export const actualizarPago = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            UPDATE hpago
            SET
            idfactura = ${info.idfactura}
            WHERE idpagos = ${info.idpagos}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Pago actualizado correctamente"
            });
        } else {
            res.json({
                respuesta: "No se actualizó ningún pago"
            });
        }

    } catch (error) {
        res.json({
            error: error,
            method: "put"
        });
    }
};

export const eliminarPago = async (req, res) => {
    let id = req.params.id;

    try {
        let resultado = await pool.query(
            `DELETE FROM hpago WHERE idpagos = ?`, 
            [id]
        );
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Pago eliminado correctamente"
            });
        } else {
            res.json({
                respuesta: "No se eliminó ningún pago"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            method: "delete"
        });
    }
};

export const listarPagos = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM hpago");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
};
