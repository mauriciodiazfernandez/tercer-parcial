//mantenimientoRoutes.js
const express = require('express');
const routes = express.Router();
const MantenimientoModel = require('../models/Mantenimiento');
const UsuarioModel = require('../models/Usuario');
const { verificarToken } = require('./AuthRoutes');
//enbdpoint traer todos las peticiones de soporte tecnicop o mantenimeinto

routes.get('/getMantenimiento', verificarToken,async (req, res) => {
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
routes.post('/registrar',verificarToken, async (req, res) => {
    const mantenimiento = new MantenimientoModel({
        nombre_peticion: req.body.nombre_peticion,
        nombre_tecnico: req.body.nombre_tecnico,
        tipo_soporte: req.body.tipo_soporte,
        descripcion: req.body.descripcion,
        usuario: req.usuario._id //asignar el id del usuario
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
routes.put('/editar/:id', verificarToken, async (req, res) => {
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
routes.delete('/eliminar/:id', verificarToken, async (req, res) => {
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
//eliminar todos
routes.delete('/eliminartodos', verificarToken, async (req, res)=>{
    try{
        await MantenimientoModel.deleteMany();
        return res.json({mensaje: "Todos los mantenimeintos han sido eliminados"})  ;      
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});
//contar el numero de mantenimeintos
routes.get('/totalmantenimiento', verificarToken, async (req,res)=>{
    try{
        const total = await MantenimientoModel.countDocuments();
        return res.json({totalMantenimiento: total})  ;      
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});
//obtener mantenimiento por usuario peticion en especifico
routes.get('/diaz/:usuario_peticion', verificarToken, async (req,res)=>{
    try{
        const mantenimiento_peticion = await MantenimientoModel.find({usuario_peticion: new RegExp(req.params.usuario_peticion, 'i')});
        return res.json({mantenimiento_peticion});      
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});
//obtener el mantenimeinto por su id
routes.get('/mantenimiento/:id', verificarToken, async (req,res)=>{
    try{
        const mantenimiento = await MantenimientoModel.findById(req.params.id);
        if (!mantenimiento)
            return res.status(404).json({ mensaje: "Mantenimeinto no encontrado" });
        else
            return res.json(mantenimiento);
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});
//obtener mantenimeinto ordenados por nombre peticion ascendente
//query.sort({ field: 'asc', test: -1 })
routes.get('/ordenarmantenimientos',verificarToken,  async (req,res)=>{
    try{
        const ordenmantenimiento = await MantenimientoModel.find().sort({nombre_tecnico: -1});
        return res.status(200).json({ordenmantenimiento});      
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});

//REPORTES
//REPORTE UNO
routes.get('/mantenimientoporusuario/:usuarioId', verificarToken, async(peticion, respuesta)=>{
    const {usuarioId} = peticion.params;
    try{
        const usuario = await UsuarioModel.findById(usuarioId);
        if (!usuario)
            return respuesta.status(404).json({mensaje: "Usuario no encontrado"});
        const mantenimientos = await MantenimientoModel.find({ usuario: usuarioId}).populate('usuario');
            respuesta.status(200).json({mantenimientos});      
    }catch(error){
        respuesta.status(500).json({ mensaje: error.message});
    }
});
//REPORTE DOS 
//Sumar manteniemitnos por usuario_tecnico
routes.get('/mantenimientosumatecnico', verificarToken, async(req, res)=>{
    try{
        const usuarios = await UsuarioModel.find();
        const reporte = await Promise.all(
            usuarios.map( async ( usuario1 ) => {
                const mantenimientos = await MantenimientoModel.find({ usuario: usuario1._id});
                //const totalmantenimientos = mantenimientos.reduce((sum, mantenimiento) => sum + mantenimiento.usuario_tecnico, 0);
                const totalmantenimientos = mantenimientos.length;
                return {
                    usuario:{
                        _id: usuario1._id,
                        nombre_usuario: usuario1.nombre_usuario
                    },
                    totalmantenimientos,
                    mantenimientos: mantenimientos.map( r => ({
                        _id: r._id,
                        nombre_peticion : r.nombre_peticion,
                        nombre_tecnico : r.nombre_tecnico,
                    }))
                }
            })
        );
        res.json(reporte);
    }catch(error){
        res.status(500).json({ mensaje: error.message});
    }
});
module.exports = routes;