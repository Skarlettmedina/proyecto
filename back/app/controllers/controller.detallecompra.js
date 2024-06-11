
import { query } from "express";
import { pool } from "../config/db_mysql.js";
import {tokenSing} from "../middlewares/middlewares.usuario.js";


export const crearDetalles = async (req, res) => {
    let info = req.body;

    try {
        // Log para depuración
        console.log("Datos a insertar:", {
            idcompra: info.idcompra,
            idproducto: info.idproducto,
            cantidad: info.cantidad,
            precio: info.precio
        });

        let [resultado] = await pool.query(
            `INSERT INTO detalle_compra (idcompra, idproducto, cantidad, precio) VALUES (?, ?, ?, ?)`,
            [info.idcompra, info.idproducto, info.cantidad, info.precio]
        );

        // Verifica si la consulta SQL afectó alguna fila
        if (resultado.affectedRows > 0) {
            res.json({
                respuesta: "Detalle insertado"
            });
        } else {
            res.json({
                respuesta: "No se insertó nada"
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
export const actualizarDetalles = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            UPDATE detalle_compra
            SET
            idcompra = '${info.idcompra}',
            cantidad = ${info.cantidad},
            precio = ${info.precio}

            WHERE iddetalle = ${info.iddetalle}
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

export const mostrarDetalles = async (req, res) => {
    let id = req.params.id;

    try {
        const resultado = await pool.query(`SELECT * FROM detalle_compra WHERE iddetalle = ?`, [id]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}

export const listarDetalles = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM detalle_compra");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}
