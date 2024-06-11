const UsuariosWeb = require("../Models/UsuariosWeb.cjs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pacientes = require("../Models/pacientes.cjs");
const notas = require("../Models/notas.cjs");
const interpretaciones = require("../Models/interpretaciones.cjs");
// Define tu clave secreta aquí
const JWT_SECRET = "TuClaveSecretaJWT";

const resolvers = {
  Query: {
    obtenerArchivosPorCurp: async (_, { curp }) => {
      try {
        // Buscar al usuario web por su CURP
        const usuarioWeb = await UsuariosWeb.findOne({ where: { curp } });

        if (!usuarioWeb) {
          throw new Error("No se encontró el usuario web");
        }

        // Obtener todos los pacientes asociados al usuario web
        const listaPacientes = await pacientes.findOne({
          where: { curp: usuarioWeb.curp },
        });

        // Obtener todas las notas asociadas a los pacientes
        const listaNotas = await notas.findAll({
          where: { id_pac: listaPacientes.idPaciente },
        });

        // Obtener todas las interpretaciones asociadas a las notas
        const listaInterpretaciones = await interpretaciones.findAll({
          where: { nota: listaNotas.map((nota) => nota.nonota) },
        });

        // Extraer los archivos de las interpretaciones
        const archivos = listaInterpretaciones.map((interpretacion) => ({
          nombre: interpretacion.archivo,
          tipo: "pdf", // Tipo de archivo PDF, puedes ajustarlo según sea necesario
          contenido: interpretacion.ruta, // Usar la ruta del archivo como contenido
          orden: interpretacion.nota,
          nota: interpretacion.orden,
        }));

        return archivos;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener los archivos");
      }
    },

    obtenerInfoPorCurp: async (_, { curp }) => {
      try {
        // Buscar al usuario web por su CURP
        const usuarioWeb = await UsuariosWeb.findOne({ where: { curp } });

        if (!usuarioWeb) {
          throw new Error("No se encontró el usuario web");
        }

        const listaPacientes = await pacientes.findOne({
          where: { curp: usuarioWeb.curp },
        });
        return listaPacientes;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la información del usuario");
      }
    },

    creacionPorCurp: async (_, { curp }) => {
      try {
        // Buscar al paciente por su CURP
        const paciente = await pacientes.findOne({ where: { curp } });
        const web = await UsuariosWeb.findOne({ where: { curp } });

        if (!paciente && !web) {
          throw new Error("No se encontró el usuario");
        } else if (web) {
          throw new Error("El usuario ya existe en la tabla UsuariosWeb");
        } else {
          // Si se encontró el paciente y no está en la tabla UsuariosWeb, devolver los datos del paciente
          return paciente;
        }
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la información del usuario");
      }
    },

    obtenerUsernamePorCurp: async (_, { curp }) => {
      try {
        // Buscar al usuario web por su CURP
        const usuarioWeb = await UsuariosWeb.findOne({ where: { curp } });

        if (!usuarioWeb) {
          throw new Error("No se encontró el usuario web");
        }

        return usuarioWeb.username;
      } catch (error) {
        console.error(error);
        throw new Error("Error al obtener la información del usuario");
      }
    },
  },

  //Ocupas ver si este funciona, obtener usuario x CURP
  /*
obtenerUsuarioPorCurp: async (_, { curp }) => {
  try {
    // Buscar al usuario web por su CURP
    const usuarioWeb = await UsuariosWeb.findOne({ where: { curp: usuarioWeb.username } });

    if (!usuarioWeb) {
      throw new Error('No se encontró el usuario web');
    }

    return usuarioWeb;
  } catch (error) {
    console.error(error);
    throw new Error('Error al obtener la información del usuario');
  }
},

*/

  Mutation: {
    crearUsuario: async (_, { input }) => {
      const {
        curp,
        email,
        username,
        password,
        nombre,
        apellidoPaterno,
        apellidoMaterno,
        fechaNacimiento,
        entidadFederativaNacimiento,
        sexo,
      } = input;

      // Verifica si el correo electrónico tiene un formato válido
      const emailValido = /^\S+@\S+\.\S+$/.test(email);
      if (!emailValido) {
        throw new Error("Formato de correo electrónico inválido");
      }

      // Verifica si el usuario ya esta dado de alrta en la base de datos de pacientes
      const existeUsuarioMRI = await pacientes.findOne({
        where: { curp },
      });

      // Verifica si el usuario ya existe
      const existeUsuario = await UsuariosWeb.findOne({
        where: { email },
      });

      if (!existeUsuarioMRI) {
        throw new Error("Aun se ha dado de alta una sucursal MRI");
      }

      if (existeUsuario) {
        throw new Error("El usuario ya está registrado");
      }

      try {
        // Hash de la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Registrar nuevo usuario con la contraseña hasheada
        const nuevoUsuario = await UsuariosWeb.create({
          curp,
          email,
          password: hashedPassword,
          username,
          nombre,
          apellidoPaterno,
          apellidoMaterno,
          fechaNacimiento,
          entidadFederativaNacimiento,
          sexo,
        });

        // Devolver los datos del usuario recién creado
        return {
          curp: nuevoUsuario.curp,
          email: nuevoUsuario.email,
          username: nuevoUsuario.username,
          nombre: nuevoUsuario.nombre,
          apellidoPaterno: nuevoUsuario.apellidoPaterno,
          apellidoMaterno: nuevoUsuario.apellidoMaterno,
          fechaNacimiento: nuevoUsuario.fechaNacimiento,
          entidadFederativaNacimiento: nuevoUsuario.entidadFederativaNacimiento,
          sexo: nuevoUsuario.sexo,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error al crear el usuario");
      }
    },

    autenticarUsuario: async (_, { input }) => {
      const { email, password } = input;

      // Busca el usuario por su dirección de correo electrónico
      const usuario = await UsuariosWeb.findOne({
        where: { email },
      });

      if (!usuario) {
        throw new Error("El Usuario no existe");
      }

      // Compara la contraseña ingresada con el hash almacenado en la base de datos
      const passwordCorrecto = await bcrypt.compare(password, usuario.password);

      if (!passwordCorrecto) {
        throw new Error("Contraseña Incorrecta");
      }
      // Genera un token JWT para el usuario autenticado usando la clave secreta definida
      const token = jwt.sign(
        {
          curp: usuario.curp,
          username: usuario.username,
          userEmail: usuario.email,
          nombre: usuario.nombre,
          apellidoPaterno: usuario.apellidoPaterno,
          apellidoMaterno: usuario.apellidoMaterno,
          sexo: usuario.sexo,
        },
        JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log("Token:", usuario.curp);

      return { token };
    },
    
    actualizarContrasena: async (_, { curp, email, nuevaContrasena }) => {
      try {
        // Buscar al usuario por su CURP y correo electrónico
        const usuario = await UsuariosWeb.findOne({ where: { curp, email } });
    
        // Verificar si el usuario existe
        if (!usuario) {
          throw new Error("El usuario no existe");
        }
    
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(nuevaContrasena, 10);
    
        // Actualizar la contraseña del usuario en la base de datos
        await UsuariosWeb.update({ password: hashedPassword }, { where: { curp, email } });
    
        return "Contraseña actualizada exitosamente";
      } catch (error) {
        console.error(error);
        throw new Error("Error al actualizar la contraseña del usuario");
      }
    },
    
  },
};



module.exports = resolvers;
