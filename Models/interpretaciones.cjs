//Falta colocar el tipo de dato aqui tambien

const { Sequelize, DataTypes } = require('sequelize');

// 1. Conectar a la base de datos (reemplaza 'mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri' con tus datos de conexión)
const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');
const notas = require('./notas.cjs');
//Este sequelize de arriba usalo en DB cambiando conectarDB a sequilize  mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri'


// 2. Definir el modelo de Usuario
const interpretaciones = sequelize.define('interpretaciones', {
  id: {
    primaryKey: true,
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  nota: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  tiponota: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  orden: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  archivo: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  ruta: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  auto: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  id_np: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  medico: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  trans: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  calidad: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  prom: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  tabare: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },

}, {
  timestamps: false, // Si no quieres timestamps de createdAt y updatedAt
});

//Relacion de uno a muchos
interpretaciones.belongsTo(notas, { foreignKey: 'nota', targetKey: 'nonota', as: 'interpretacionesNota'});
notas.hasMany(interpretaciones, { foreignKey: 'nota', sourceKey: 'nonota', as: 'notasInterpretaciones' });

// 3. Sincronizar el modelo con la base de datos
sequelize.sync();

// Exporta el modelo
module.exports = interpretaciones;
