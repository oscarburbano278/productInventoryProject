// backend/src/config/database.js
const mysql = require('mysql2/promise');

async function connectDB() {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });
        console.log('Conexión a MySQL exitosa');
        await connection.end();
    } catch (error) {
        console.error('Error al conectar con la base de datos:', error.message);
    }
}

module.exports = { connectDB };