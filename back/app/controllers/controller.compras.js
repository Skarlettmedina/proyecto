
import { query } from "express";
import { pool } from "../config/db_mysql.js";
import {tokenSing} from "../middlewares/middlewares.usuario.js";



export const crearCompra = async (req, res) => {
    let info = req.body;

    // Convertir fecha_compra a formato MySQL
    let fechaCompra = new Date(info.fecha_compra);
    let formattedFechaCompra = fechaCompra.toISOString().slice(0, 19).replace('T', ' ');

    try {
        // Log para depuración
        console.log("Datos a insertar:", {
            idusuario: info.idusuario,
            precio: info.precio,
            fecha_compra: formattedFechaCompra
        });

        let [resultado] = await pool.query(
            `INSERT INTO compras (idusuario, precio, fecha_compra) VALUES (?, ?, ?)`,
            [info.idusuario, info.precio, formattedFechaCompra]
        );

        // Verifica si la consulta SQL afectó alguna fila
        if (resultado.affectedRows > 0) {
            res.json({
                respuesta: "Compra realizada"
            });
        } else {
            res.json({
                respuesta: "No se compró nada"
            });
        }
    } catch (error) {
        console.error("Error en la inserción:", error);
        res.json({
            error: error,
            method: "post"
        });
    }
}



export const mostrarCompra = async (req, res) => {
    let id = req.params.id;

    try {
        const resultado = await pool.query(`SELECT * FROM compras WHERE idcompra = ?`, [id]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}

export const eliminarCompra = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            DELETE FROM compras
            WHERE idcompra = ${info.idcompra}
        `);
        if (resultado[0].affectedRows > 0) {
            res.json({
                respuesta: "Compra cancelada"
            });
        } else {
            res.json({
                respuesta: "No se canceló la compra"
            });
        }

    } catch (error) {
        res.json({
            error: error,
            method: "delete"
        });
    }
}

export const listarCompra = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM compras");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}
