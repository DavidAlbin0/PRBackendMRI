//Falta colocar el tipo de dato aqui

const { Sequelize, DataTypes } = require('sequelize');

// 1. Conectar a la base de datos (reemplaza 'mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri' con tus datos de conexión)
const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');
const pacientes = require('./pacientes.cjs');
//Este sequelize de arriba usalo en DB cambiando conectarDB a sequilize  mysql://administrador:Wvqy&LWS@9y4B#@mrimagenc.ddns.net:3306/appmri'


// 2. Definir el modelo de Usuario
const notas = sequelize.define('notas', {
  idNota: {
    primaryKey: true,
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  nonota: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  medico: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  paciente: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  usuario: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  convenio: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  fecha_prin: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  fecha: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  status: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  total: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  transferencia: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  cheque: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  descuento: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  formPago: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  provCred: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  comisionamex: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  acuenta: {
    type: DataTypes.STRING, // Tipo de dato para el nombre (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  efectivo: {
    type: DataTypes.STRING, // Tipo de dato para el email (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  tarjeta: {
    type: DataTypes.STRING, // Tipo de dato para la contraseña (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
    trim: true,
  },
  observaciones: {
    type: DataTypes.DATE, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  tiponota: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  id_pac: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  id_med: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  debe: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  ncotizacion: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  idprom: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },
  TiempoPago: {
    type: DataTypes.STRING, // Tipo de dato para la fecha de registro (cambia según tus necesidades)
    allowNull: false, // Puedes ajustar esto según tus requerimientos
  },

}, {
  timestamps: false, // Si no quieres timestamps de createdAt y updatedAt
});

notas.belongsTo(pacientes, { foreignKey: 'id_pac', targetKey: 'idPaciente', as: 'notasPaciente' });
pacientes.hasMany(notas, { foreignKey: 'id_pac', sourceKey: 'idPaciente', as: 'pacienteNotas' });

// 3. Sincronizar el modelo con la base de datos
sequelize.sync();


// Exporta el modelo
module.exports = notas;
