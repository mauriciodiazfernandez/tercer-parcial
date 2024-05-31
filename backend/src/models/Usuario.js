//Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//definir el schema
const usuarioSchema = new mongoose.Schema({
    nombre_usuario: {
        type: String,
        required : true,
        unique : true
    },
    correo: {
        type: String,
        required : true,
        unique : true
    },
    password: {
        type: String,
        required : true,
    }
});

//const UsuarioModel = mongoose.model('Usuario',usuarioSchema,'usuario');
//hashear contraseña
usuarioSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        console.log(this.password);
    }
    next();
});
//comparar contrasseña
usuarioSchema.methods.compararPassword = async function (passwordComparar){
    return await bcrypt.compare(passwordComparar, this.password);
};
const UsuarioModel = mongoose.model('Usuario',usuarioSchema,'usuario');

module.exports = UsuarioModel;