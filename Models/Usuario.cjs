const { Sequelize, DataTypes } = require('sequelize');

// 1. Conectar a la base de datos (reemplaza 'mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri' con tus datos de conexión)
const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');

//Este sequelize de arriba usalo en DB cambiando conectarDB a sequilize  mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri'


// 2. Definir el modelo de Usuario
const Usuario = sequelize.define('Usuario', {
  nombre: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
    trim: true,
  },
  email: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
    unique: true, // Esto asegura que el email sea único en la base de datos
    trim: true,
  },
  password: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
    trim: true,
  },
  registro: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
    defaultValue: Sequelize.NOW, // Valor por defecto para la fecha de registro
  },
}, {
  timestamps: false, // Si no quieres timestamps de createdAt y updatedAt
});

// 3. Sincronizar el modelo con la base de datos
sequelize.sync();

// Exporta el modelo
module.exports = Usuario;
