//Activo.js
const mongoose = require('mongoose');
const activoSchema = new mongoose.Schema({
    //nombre_peticion: { type: String, require:true}
    codigo_activo:
    {
        type: String,
        required : true
    },
    nombre_activo:
    {
        type: String,
        required : true
    },
    tipo_activo:
    {
        type: String,
        required : true
    },
    mantenimiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Mantenimiento',
    }
});
const ActivoModel = mongoose.model('Activo',activoSchema,'activo');
module.exports = ActivoModel;