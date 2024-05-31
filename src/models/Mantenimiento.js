//Mantenimiento.js
const mongoose = require('mongoose');
//definir el schema
const mantenimientoSchema = new mongoose.Schema({
    //nombre_peticion: { type: String, require:true}
    nombre_peticion: String,
    nombre_tecnico: String,
    tipo_soporte: String,
    descripcion: String,
});

const MantenimientoModel = mongoose.model('Mantenimiento',mantenimientoSchema,'mantenimiento');
module.exports = MantenimientoModel;
