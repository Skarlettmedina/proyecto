
import { query } from "express";
import { pool } from "../config/db_mysql.js";
import {tokenSing} from "../middlewares/middlewares.usuario.js";

export const crearProductos = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
        insert into productos(idproducto, 
            nombrep,color,precio,stock) values (
                    ${info.idproducto},'${info.nombrep}',
                    '${info.color}','${info.precio}','${info.stock}'
            )
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

export const mostrarProductos = async (req, res) => {
    let id = req.params.id;

    try {
        const resultado = await pool.query(`SELECT * FROM productos WHERE idproducto = ?`, [id]);
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}

export const actualizarProductos = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            UPDATE productos
            SET
            nombrep = '${info.nombrep}',
            color = '${info.color}',
            precio = ${info.precio},
            stock = ${info.stock}

            WHERE idproducto = ${info.idproducto}
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

export const eliminarProductos = async (req, res) => {
    let info = req.body;

    try {
        let resultado = await pool.query(`
            DELETE FROM productos
            WHERE idproducto = ${info.idproducto}
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

export const listarProductos = async (req, res) => {
    try {
        const resultado = await pool.query("SELECT * FROM productos");
        res.json(resultado[0]);
    } catch (error) {
        res.json({
            error: error,
            method: "get"
        });
    }
}
