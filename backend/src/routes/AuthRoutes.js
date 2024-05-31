//AuthRoutes.js
const express = require('express');
const routes = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Registro
routes.post('/registro', async (req, res)=>{
    try{
        const { nombre_usuario,correo,password } = req.body;
        const usuario = new Usuario({nombre_usuario, correo, password});
        await usuario.save();
        res.status(201).json({mensaje: 'Usuario registrado'});
    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
});

//Inicio de session

routes.post('/iniciarsesion', async (req, res)=>{
    try{
        const { correo, password } = req.body;
        const correo_email = await Usuario.findOne({correo});
        if (!correo_email)
            return res.status(401).json({ error : 'Correo invalido!!!!!!!'});

        const validarPassword = await correo_email.compararPassword(password);
        if (!validarPassword)
            return res.status(401).json({ error : 'Password invalido !!!'});

        const token = jwt.sign({ usuarioId: correo_email._id }, 'clave_secreta', { expiresIn:'3h'});
        res.json({token});

    }catch(error){
        res.status(500).json({mensaje: error.message})
    }
});
//cerrar session
// Declara un conjunto para almacenar los tokens negros
const tokensinvalidos = new Set();

// Cerrar sesión
routes.post('/cerrarsesion', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("este es el token a invalidar", token);
        tokensinvalidos.add(token);
        res.json({ mensaje: 'Sesión cerrada exitosamente' });
    } catch (error) {
        // Si hay algún error, responder con un mensaje de error
        res.status(500).json({ mensaje: error.message });
    }
});
const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        if (tokensinvalidos.has(token)) {
            return res.status(401).json({ mensaje: 'Token inválido' });
        }

        jwt.verify(token, 'clave_secreta', (err, user) => {
            if (err) {
                return res.status(403).json({ mensaje: 'Token no es válido' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ mensaje: 'No token, autorización denegada' });
    }
};

module.exports = { routes, verificarToken };
//module.exports = routes;