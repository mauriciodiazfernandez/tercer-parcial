//ActivoRoutes.js
const express = require('express');
const routes = express.Router();
const ActivoModel = require('../models/Activo');
const MantenimientoModel = require('../models/Mantenimiento');
const { verificarToken } = require('./AuthRoutes');
//enbdpoint traer todos las peticiones de los activos
/* routes.get('/getActivo', verificarToken,async (req, res) => {
    try {
        console.log('Solicitud GET a /activos/getActivo recibida');
        const activo = await ActivoModel.find({});
        console.log('Resultado de Mantenimiento de DB',activo );
        res.json(activo);
    } catch (error){
        res.status(500).json({mensaje: error.mensaje});
    }
}); */
routes.get('/getActivo', async (req, res) => {
    try {
        console.log('Solicitud GET a /activos/getActivo recibida');
        const activo = await ActivoModel.find({});
        console.log('Resultado de Mantenimiento de DB',activo );
        res.json(activo);
    } catch (error){
        res.status(500).json({mensaje: error.mensaje});
    }
});
//Crear
routes.post('/registraractivo',verificarToken, async (req, res) => {
    const activo = new ActivoModel({
        codigo_activo: req.body.codigo_activo,
        nombre_activo: req.body.nombre_activo,
        tipo_activo: req.body.tipo_activo,
        mantenimiento: req.body.mantenimiento //deberia asignar el id de mantenimiento
    });
    try {
        console.log(activo);
        const nuevoactivo = await activo.save();
        res.status(201).json(nuevoactivo);
    } catch(error){
        res.status(400).json({mensaje: error.message})
    }
});
//Modificar o actualizar
routes.put('/editaractivo/:id', verificarToken, async (req, res) => {
    try{
        const activoEditado = await ActivoModel.findByIdAndUpdate(req.params.id,req.body,{ new: true });
        if (!activoEditado)
            return res.status(404).json({mensaje: "No existe el Activo"});
        else
            return res.status(201).json(activoEditado);
    }catch(error){
        res.status(400).json({mensaje: error.message})
    }
});
//ELIMINAR
routes.delete('/eliminaractivo/:id', verificarToken, async (req, res) => {
    try{
        const activoeliminado = await ActivoModel.findByIdAndDelete(req.params.id);
        if (!activoeliminado)
            return res.status(404).json({mensaje: "Activo no encontraod"});
        else
            return res.json({mensaje: "Activo Elimionado!!!"});
        
    }catch(error){
        res.status(500).json({mensaje: error.message});
    }
});
module.exports = routes;