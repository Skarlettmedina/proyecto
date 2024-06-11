import { query } from "express";
import { pool } from "../config/db_mysql.js";
import {tokenSing} from "../middlewares/middlewares.usuario.js";

export const crearUsuario = async(req, res)=>{
    let info = req.body;
    
    try {
        let resultado = await pool.query(`
            insert into usersa(idusuario, 
            usuario,email,contrasena,roles) values(
                    ${info.idusuario},'${info.usuario}',
                    '${info.email}','${info.contrasena}',
                    '${info.roles}'
            )
        `);
        if (resultado[0].affectedRows > 0){
            res.json({
                respuesta:"Registro insertado",
                code: 1
            });
        }else{
            res.json({
                respuesta: "No se insertó nada",
                code: 0
            });
        }
    } catch (error) {
        res.json({
            "error": error.message, // Cambiado para incluir el mensaje de error específico
            "method": "post"
        });
    }
}
export const mostrarUsuario = async(req, res)=>{

    let id = req.params.id;

    try{
        const resultado = await pool.query(`SELECT * FROM usersa WHERE idusuario = ?`, [id])
        res.json(resultado[0]);
    }catch (error) {
        res.json({
            "error": error,
            "method": "get"
        });
    }
    
}
export const actualizarUsuario = async(req, res) => {
    let info = req.body;
    const inf =           
         `update usersa
        set
        usuario = '${info.usuario}',
        email = '${info.email}',
        contrasena = '${info.contrasena}',
        roles = '${info.roles}',
        where idusuario = ${info.idusuario}`
        console.log(inf);
    try {
        let resultado = await pool.query(`
            update usersa
            set
            usuario = '${info.usuario}',
            email = '${info.email}',
            contrasena = '${info.contrasena}',
            roles = '${info.roles}'
            where idusuario = ${info.idusuario}
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
            "error": error,
            "method": "put"
        });
    }
}

export const eliminarUsuario = async(req, res)=>{
    let info = req.body;
    
    try {
        let resultado = await pool.query(`
            delete from usersa
            where idusuario = ${info.idusuario}
                    
        `);
        if (resultado[0].affectedRows > 0){
            res.json({
                respuesta:"Registro eliminado"
            });
        }else{
            res.json({
                respuesta: "No eliminó nada"
            });
        }
        
    } catch (error) {
        res.json({
            "error": error,
            "method": "delete"
        });
    }
}
export const loginUsuario = async (req, res) => {
    let email = req.body.email;
    let contrasena = req.body.contrasena;

    try {
        let [resultado] = await pool.query(`
            SELECT idusuario, email, roles FROM usersa 
            WHERE email ='${email}' AND contrasena ='${contrasena}'
        `);
        let usuario = resultado[0];

        if (!usuario) {
            res.json({
                respuesta: "Logueo incorrecto",
                estado: false
            });
        } else {
            let token = tokenSing(usuario); // Pasa el objeto usuario directamente a tokenSing
            console.log(token);
            res.json({
                respuesta: "Logueo correcto",
                estado: true,
                token: token
            });
        }
    } catch (error) {
        console.error("Error en la consulta:", error);
        res.json({
            error: "Error en la consulta",
            method: "POST"
        });
    }
}

export const listarUsuario = async(req, res)=>{

    try{
        const resultado = await pool.query("select * from usersa");
        res.json(resultado[0]);
    }catch (error) {
        res.json({
            "error": error,
            "method": "get"
        });
    }
}