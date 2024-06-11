const { Sequelize, DataTypes } = require('sequelize');

// 1. Conectar a la base de datos (reemplaza 'mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri' con tus datos de conexión)
const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');
const Usuario = require('./Usuario.cjs'); // Importa el modelo de Usuario
const { v4: uuidv4 } = require('uuid');
const Estudio = sequelize.define('Estudios', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true
  },
  Estudio: {
    type: DataTypes.STRING,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
  },
});

// Establece la relación entre Estudio y Usuario
Estudio.belongsTo(Usuario, {
  foreignKey: 'creadorId',
  as: 'creador'
});

module.exports = Estudio;
