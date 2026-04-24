require ('dotenv').config();

const mysql = require('mysql2/promise');

//Verificar que las variables de entorno estén definidas
const requiredEnvVars = ['DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];
requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`Error: La variable de entorno ${varName} no está definida.`);
        process.exit(1);
    }
});


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
module.exports = pool;
