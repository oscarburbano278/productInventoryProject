// backend/src/app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { connectDB } = require('./config/database');

// Cargar variables de entorno
dotenv.config();

const app = express();

// Muestra las variables de entorno relevantes para depuración
console.log('Variables de entorno:', {
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
});

// Conectar a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/products', require('./routes/product.routes'));

// Ruta de prueba inicial
app.get('/', (req, res) => {
    res.send('¡API de la tienda online funcionando!');
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});