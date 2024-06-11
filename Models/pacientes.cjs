const { Sequelize, DataTypes } = require('sequelize');
const UsuariosWeb = require('./UsuariosWeb.cjs');

const sequelize = new Sequelize('mysql://root:3.1416Xpi@localhost:3306/imagenc');

const pacientes = sequelize.define('pacientes', {
  idPaciente: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    trim: true,
  },
  nombre_pac: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  apat_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  amat_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  fecnac_Pac: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  edad_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  tel_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  calle_Pac: {
    type: DataTypes.TEXT(65535),
    allowNull: false,
  },
  ciudad_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edo_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo_Pac: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  colonia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cp: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  }, 
  correo_pac2: {
    type: DataTypes.STRING,
    allowNull: false,
    trim: true,
  },
  autoriza1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autoriza2: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  curp: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  entidad_nacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
});

pacientes.belongsTo(UsuariosWeb, { foreignKey: 'curp', targetKey: 'curp', as: 'usuario' });
UsuariosWeb.hasOne(pacientes, { foreignKey: 'curp', sourceKey: 'curp', as: 'paciente' });

sequelize.sync();

module.exports = pacientes;
