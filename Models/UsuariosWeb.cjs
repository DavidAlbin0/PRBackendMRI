const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');

const UsuariosWeb = sequelize.define('UsuariosWeb', {
  curp: {
    type: DataTypes.STRING(20),
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING(10),
    allowNull: false,
    trim: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    trim: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  fechaNacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  entidadFederativaNacimiento: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
    trim: true,
  },
  registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
});


sequelize.sync();

module.exports = UsuariosWeb;
