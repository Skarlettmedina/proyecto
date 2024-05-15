import { pool } from "../config/db_mysql.js";

export const crearFactura = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            INSERT INTO factura (idusuario, idproductos, cantidad, fecha) 
            VALUES (${info.idusuario}, ${info.idproductos}, ${info.cantidad}, '${info.fecha}')
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Registro insertado"
            });
        } else {
            res.json({
                respuesta: "No se insertó nada"
            });
        }
    } catch (error) {
        res.json({
            error: error,
            method: "post"
        });
    }
}

export const mostrarFactura = async (req, res) => {
    let id = req.params.id;

    try {
        const resultado = await pool.query(`
            SELECT * FROM factura WHERE idfactura = ?
        `, [id]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}

export const actualizarFactura = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            UPDATE factura
            SET
            idusuario = ${info.idusuario},
            idproductos = ${info.idproductos},
            cantidad = ${info.cantidad},
            fecha = '${info.fecha}'
            WHERE idfactura = ${info.idfactura}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Registro modificado"
            });
        } else {
            res.json({
                respuesta: "No modificó nada"
            });
        }

    } catch (error) {
        res.json({
            error: error,
            method: "put"
        });
    }
}

export const eliminarFactura = async (req, res) => {
    let id = req.params.id;

    try {
        let resultado = await pool.query(`
            DELETE FROM factura
            WHERE idfactura = ${id}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Registro eliminado"
            });
        } else {
            res.json({
                respuesta: "No eliminó nada"
            });
        }

    } catch (error) {
        res.json({
            error: error,
            method: "delete"
        });
    }
}

export const listarFacturas = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM factura");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}
