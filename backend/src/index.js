"use strict"
//importacione de lkivbreriasd
const { error } = require('console');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
//const AuthRoutes = require('./routes/AuthRoutes');
const { routes: AuthRoutes  } = require('./routes/AuthRoutes');
const Usuario = require('./models/Usuario');
require('dotenv').config();
const app = express();
//rutas
const mantenimientoroutes = require('./routes/mantenimientoRoutes');
const activoroutes = require('./routes/ActivoRoutes');

//configuraciones de envoironment
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
//manejo de JSON
app.use(express.json());
//CONEXION A FRONTEND POR CORS
const corsOptions = {
    origin: [ 'http://localhost:4200','http://localhost:4200/'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
//CONEXION CON MONGODB
mongoose.connect(MONGO_URI)
.then(()=> {
    console.log('Conexion Exitosa');
    app.listen(PORT, () => {console.log("Servidor Express corriendo en el puerto",PORT)})
}
).catch( error => console.log('error de conexion', error));

const autenticar = async (req, res, next)=>{
    try{
        //verificar autorizacion
        const token = req.headers.authorization?.split(' ')[1];
        console.log("token",token);
        if (!token) {
            res.status(401).json({mensaje: "No existe el Token de authenticacion"});
        }
        const decodificar = jwt.verify(token, 'clave_secreta');
        console.log("decodificar",decodificar);
        req.usuario = await Usuario.findById(decodificar.usuarioId);
        console.log("request",req);
        next();
    }catch(error){
        //res.status(400).json({error: 'token Invalido !!!'})
        res.status(400).json({mensaje : error.message});
    }
}
//utilizar rutas con authentication
app.use('/auth', AuthRoutes);
//app.use('/mantenimiento', autenticar, mantenimientoroutes);
app.use('/activos', autenticar, activoroutes);

//utilizar las rutas de mantenimiento
app.use('/mantenimiento',mantenimientoroutes);
//require('./server/server');