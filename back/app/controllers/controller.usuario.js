import { query } from "express";
import { pool } from "../config/db_mysql.js";
import {tokenSing} from "../middlewares/middlewares.usuario.js";

export const crearUsuario = async(req, res)=>{
    let info = req.body;
    
    try {
        let resultado = await pool.query(`
            insert into usersa(idusuario, 
            usuario,edad,email,contrasena) values(
                    ${info.idusuario},'${info.usuario}',
                    ${info.edad},'${info.email}','${info.contrasena}'
            )
        `);
        if (resultado[0].affectedRows > 0){
            res.json({
                respuesta:"Registro insertado"
            });
        }else{
            res.json({
                respuesta: "No se insertó nada"
            });
        }
    } catch (error) {
        res.json({
            "error": error,
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
    
    try {
        let resultado = await pool.query(`
            update usersa
            set
            usuario = '${info.usuario}',
            edad = ${info.edad},
            email = '${info.email}',
            contrasena = '${info.contrasena}'
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
            error: error,
            method: "put"
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
export const loginUsuario = async(req, res)=>{
    let email = req.body.email;
    let contrasena = req.body.contrasena;

    try {
        let resultado = await pool.query(`select email from usersa where  email ='${email}' and contrasena ='${contrasena}'
        `);
        if (resultado [0]==""){
            res.json({
                respuesta: "Logueo incorrecto",
                estado:false
            });
        }else{
            let token = tokenSing({
                email: email,
                contrasena: contrasena
                });
        res.json({
            respuesta: "Logueo correcto",
            estado: true,
            token: token
        });
    }
    }catch (error) {
        res.json({
            respuesta: "Error en el logueo",
            type: error
        })
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