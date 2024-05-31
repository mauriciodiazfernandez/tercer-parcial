const express = require('express');
const request = require('supertest');
const activoroutes = require('../../routes/ActivoRoutes');
const ActivoModel = require('../../models/Activo');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use('/activos', activoroutes);

describe('Pruebas unitarias para activos', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/appmantenimiento',{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        await ActivoModel.deleteMany({});
    });
    //al finalizar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
    });
    //primer test GET
    test('Deberia traer todos los activos metodo GET: getActivo', async() =>{
        await ActivoModel.create({ codigo_activo:'Oscar', nombre_activo:'Abel',tipo_activo:"Redes"});
        //solicitudes o request
        const resultado = await request(app).get('/activos/getActivo');
        //verificar la respuesta
        expect(resultado.statusCode).toEqual(200);
        expect(resultado.body).toHaveLength(1);
    }, 10000);
});