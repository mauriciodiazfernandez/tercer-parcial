// server.js
const express = require('express');
const session = require('express-session'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const Mantenimiento = require('../models/Mantenimiento');

const app = express();
app.use(session({
    secret: '12345678',
    resave: false,
    saveUninitialized: false
}));
// Configurar bodyParser para procesar datos de formularios
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', __dirname + '/../views');

// Rutas y lógica de tu aplicación
app.get('/login', (req, res) => {
    res.render('inicio');
});
// Manejar el envío de datos del formulario de inicio de sesión
app.post('/loginpost', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario en la base de datos
        const user = await User.findOne({ username });

        // Si el usuario no existe, mostrar un mensaje de error
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        // Verificar si la contraseña coincide utilizando bcrypt.compare()
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Si la contraseña coincide, redirigir al usuario a la página de inicio
            res.redirect('/home');
        } else {
            // Si la contraseña no coincide, mostrar un mensaje de error
            res.status(401).send('Contraseña incorrecta');
        }
    } catch (error) {
        // Manejar cualquier error
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
});

app.get('/home', (req, res) => {
    res.render('home');
});
app.get('/registeruser', (req, res) => {
    res.render('registro');
});

// Manejar el envío de datos del formulario de registro
app.post('/registeruser', async (req, res) => {
    const { username, password } = req.body;

    // Hashear la contraseña antes de almacenarla en la base de datos
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Crear un nuevo usuario con los datos del formulario
        const user = new User({ username, password: hashedPassword });
        await user.save(); // Guardar el usuario en la base de datos
        res.redirect('/login'); // Redirigir al formulario de inicio de sesión
    } catch (error) {
        res.status(500).send('Error al registrar el usuario');
    }
});
// server.js

// Importar paquetes y configuraciones necesarias

// Añadir la ruta para el logout
app.get('/logout', (req, res) => {
    // Limpiar la sesión
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/login');
    });
});


app.get('/listasoporte', async (req, res) => {
    try {
        // Obtén el listado de mantenimientos desde la base de datos
        const mantenimientos = await Mantenimiento.find();

        // Renderiza la vista 'listasoporte.ejs' y pasa los datos de los mantenimientos
        res.render('listasoporte', { mantenimientos });
    } catch (error) {
        // Maneja cualquier error
        console.error('Error al obtener el listado de mantenimientos:', error);
        res.status(500).send('Error en el servidor');
    }
});
// Iniciar el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
