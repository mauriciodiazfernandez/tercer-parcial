//mantenimientoRoutes.js
const express = require('express');
const routes = express.Router();
const MantenimientoModel = require('../models/Mantenimiento');

//enbdpoint traer todos las peticiones de soporte tecnicop o mantenimeinto

routes.get('/getMantenimiento', async (req, res) => {
    try {
        console.log('Solicitud GET a /mantenimiento/getMantenimiento recibida');
        const mantenimiento = await MantenimientoModel.find({});
        console.log('Resultado de Mantenimiento de DB',mantenimiento );
        res.json(mantenimiento);
    } catch (error){
        res.status(500).json({mensaje: error.mensaje});
    }
});
//Crear
routes.post('/registrar', async (req, res) => {
    const mantenimiento = new MantenimientoModel({
        nombre_peticion: req.body.nombre_peticion,
        nombre_tecnico: req.body.nombre_tecnico,
        tipo_soporte: req.body.tipo_soporte,
        descripcion: req.body.descripcion,
    });
    try {
        console.log(mantenimiento);
        const nuevoMantenimiento = await mantenimiento.save();
        res.status(201).json(nuevoMantenimiento);
    } catch(error){
        res.status(400).json({mensaje: error.message})
    }
});
//Modificar o actualizar
routes.put('/editar/:id', async (req, res) => {
    try{
        //const mantenimeintoEditado = await MantenimientoModel.findByIdAndUpdate(id,update,options);
        const mantenimeintoEditado = await MantenimientoModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if (!mantenimeintoEditado)
            return res.status(404).json({mensaje: "No existe el Mantenimiento"});
        else
            return res.status(201).json(mantenimeintoEditado);
    }catch(error){
        res.status(400).json({mensaje: error.message})
    }
});
//ELIMINAR
routes.delete('/eliminar/:id', async (req, res) => {
    try{
        const mantenimeintoeliminado = await MantenimientoModel.findByIdAndDelete(req.params.id);
        if (!mantenimeintoeliminado)
            return res.status(404).json({mensaje: "Mantenimiento no encontraod"});
        else
            return res.json({mensaje: "Mantenimiento Elimionado!!!"});
        
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = routes;