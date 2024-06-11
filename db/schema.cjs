const { gql } = require('apollo-server');

const typeDefs = gql`
  type Estudio {
    nombre: String
    id: ID
    tipo: String
  }

  type Archivo {
    nombre: String
    tipo: String
    contenido: String
    nota: String
    orden: String
  }  

  type Fecha {
    fecha: String
  }

  type Query {
    obtenerArchivosPorCurp(curp: String!): [Archivo]
    obtenerFecha: [Fecha]
    obtenerEstudio: [Estudio]
    obtenerInfoPorCurp(curp: String!): Paciente 
    obtenerUsernamePorCurp(curp: String!): String
    creacionPorCurp(curp: String!): Paciente  # Añadido aquí

  }

  type Paciente {
    idPaciente: Int
    nombre_pac: String
    apat_Pac: String
    amat_Pac: String
    fecnac_Pac: String
    edad_Pac: String
    sexo_Pac: String
    tel_Pac: String
    calle_Pac: String
    ciudad_Pac: String
    edo_Pac: String
    correo_Pac: String
    colonia: String
    cp: String
    correo_pac2: String
    autoriza1: String
    autoriza2: String
    curp: String
    entidad_nacimiento: String
  }
  
  type Nota {
    idNota: String
    nonota: String
    medico: String
    paciente: Paciente  # Corregido a Paciente
    usuario: String
    convenio: String
    fecha_prin: String
    fecha: String
    status: String
    total: String
    transferencia: String
    cheque: String
    descuento: String
    formPago: String
    provCred: String
    comisionamex: String
    acuenta: String
    efectivo: String
    tarjeta: String
    observaciones: String
    tiponota: String
    id_pac: String
    id_med: String
    debe: String
    ncotizacion: String
    idprom: String
    TiempoPago: String
  }
  
  
  type Interpretacion {
    id: String
    nota: String
    tiponota: String
    orden: String
    archivo: String
    ruta: String
    auto: String
    id_np: String
    medico: String
    trans: String
    calidad: String
    prom: String
    tabare: String
  }
  
  type Usuario {
    curp: String
    email: String
    password: String
    username: String
    nombre: String
    apellidoPaterno: String
    apellidoMaterno: String
    fechaNacimiento: String
    entidadFederativaNacimiento: String
    sexo: String
  }

  input UsuarioInput {
    curp: String!
    email: String!
    password: String!
    username: String!
    nombre: String!
    apellidoPaterno: String!
    apellidoMaterno: String!
    fechaNacimiento: String!
    entidadFederativaNacimiento: String!
    sexo: String!
  }

  input AutenticarInput {
    email: String!
    password: String!
  }

  type Token {
    token: String
  }

  type Mutation {
    crearUsuario(input: UsuarioInput): Usuario
    autenticarUsuario(input: AutenticarInput): Token
    obtenerArchivosPorCurp(curp: String!): [Archivo]
    actualizarContrasena(curp: String!, email: String!, nuevaContrasena: String!): String
  }
`;

module.exports = typeDefs;
