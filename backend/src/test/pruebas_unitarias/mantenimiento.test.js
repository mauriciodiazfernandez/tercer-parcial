const express = require('express');
const request = require('supertest');
const mantenimientoroutes = require('../../routes/mantenimientoRoutes');
const mantenimeintoModel = require('../../models/Mantenimiento');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
app.use('/mantenimiento', mantenimientoroutes);

describe('Pruebas unitarias para matenimiento', () => {
    //se ejecuta antes de iniciar las pruebas
    beforeEach(async () => {
        await mongoose.connect('mongodb://localhost:27017/appmantenimiento',{
            useNewUrlParser : true,
            useUnifiedTopology: true,
        });
        await mantenimeintoModel.deleteMany({});
    });
    //al finalizar las pruebas
    afterAll(() => {
        return mongoose.connection.close();
    });
    //primer test GET
    test('Deberia traer todos los mantenimientos metodo GET: getMamntenimiento', async() =>{
        await mantenimeintoModel.create({ nombre_peticion:'Oscar', nombre_tecnico:'Abel',tipo_soporte:"Redes",descripcion:'Cambio de RJ45',usuario:'664ce0fc0c9f53ae4dcbd795' });
        await mantenimeintoModel.create({ nombre_peticion:'Edmundo', nombre_tecnico:'Angela',tipo_soporte:"Redes",descripcion:'Cambio de RJ45',usuario:'664ce0fc0c9f53ae4dcbd795' });
        //solicitudes o request
        const resultado = await request(app).get('/mantenimiento/getMantenimiento');
        //console.log("datos del resultado", resultado);
        //verificar la respuesta
        expect(resultado.statusCode).toEqual(200);
        expect(resultado.body).toHaveLength(2);
    }, 10000);

    //segundo test POST
    test('Deberia agregar un nuevo manteniemitno: POST /registrar', async()=> {
        const nuevoMantenimiento = {
            nombre_peticion:'Gonzalo Espejo',
            nombre_tecnico:'Adrian zabala',
            tipo_soporte:"Redes",
            descripcion:'Cambio de RJ45'
        };
        const res = await request(app)
                            .post('/mantenimiento/registrar')
                            .send(nuevoMantenimiento);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre_peticion).toEqual(nuevoMantenimiento.nombre_peticion);
    });
    //tercer test PUT 
    test('Deberia actualizar una tarea ya existente: PUT  /editar/:id', async()=>{
        const mantenimientoCreado = await mantenimeintoModel.create({
            nombre_peticion:'Gonzalo Espejo',
            nombre_tecnico:'Adrian zabala',
            tipo_soporte:"Redes",
            descripcion:'Cambio de RJ45'
        });
        const mantenimientoModificado = {
            nombre_peticion:'Gonzalo Miro (ediatdo)',
            nombre_tecnico:'Adrian Rodriguez (ediatdo)',
            tipo_soporte:"Redes",
            descripcion:'Cambio de RJ45'
        };
        const res = await request(app)
                        .put('/mantenimiento/editar/'+mantenimientoCreado._id)
                        .send(mantenimientoModificado);
        expect(res.statusCode).toEqual(201);
        expect(res.body.nombre_peticion).toEqual(mantenimientoModificado.nombre_peticion);
    });
    //cuarto test DELETE
    test('Deberia eliminar una tarea existente: DELETE /eliminar/:id', async() => {
        const mantenimientoCreado = await mantenimeintoModel.create({
            nombre_peticion:'Gonzalo Espejo',
            nombre_tecnico:'Adrian zabala',
            tipo_soporte:"Redes",
            descripcion:'Cambio de RJ45'
        });
        const res = await request(app)
                        .delete('/mantenimiento/eliminar/'+mantenimientoCreado._id);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({mensaje: "Mantenimiento Elimionado!!!"});
    });
});