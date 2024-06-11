const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const cors = require('cors');
const express = require('express');
require('dotenv').config({ path: 'variable'})
dotenv.config();

const app = express(); // Crea una instancia de Express

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '3.1416Xpi',
  database: 'imagenc',
});

//192.168.100.1
const corsOptions = {
  origin: 'http://localhost:4000',
  credentials: true,
};

app.use(cors(corsOptions));

async function conectarDB() {
  try {
    // Realiza una conexión de prueba para verificar si la base de datos está accesible
    console.log('Conexión a la base de datos establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
}

module.exports = {
  conectarDB, // Exporta la función conectarDB
  pool, // Exporta el objeto de conexión a la base de datos
};
