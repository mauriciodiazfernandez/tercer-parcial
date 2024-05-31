"use strict"
//importacione de lkivbreriasd
const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
//rutas
const mantenimientoroutes = require('./routes/mantenimientoRoutes');

//configuraciones de envoironment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
//manejo de JSON
app.use(express.json());
//CONEXION CON MONGODB
mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('Conexion Exitosa');
    app.listen(PORT, () => {console.log("Servidor Express corriendo en el puerto",PORT)})
}
).catch( error => console.log('error de conexion', error));

//utilizar las rutas de mantenimiento
app.use('/mantenimiento',mantenimientoroutes);
require('./server/server');