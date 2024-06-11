const { ApolloServer } = require('apollo-server');
const typeDefs = require('./db/schema.cjs');
const resolvers = require('./db/resolvers.cjs');
const { conectarDB } = require('./config/db.cjs'); // Importa la función conectarDB
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'TuClaveSecretaJWT'; 

// Llama a conectarDB para establecer la conexión a la base de datos
conectarDB();

const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({req}) => {
    const token = req.headers['authorization'] || '';
    if(token){
      try {
          const usuario = jwt.verify(token, JWT_SECRET);
          console.log(usuario);
          return { userId: usuario.userId }; // Establece userId en el contexto
      } catch (error) {
        
      }
    }
  }
});
server.listen().then(({ url }) => {
  console.log(`Servidor listo en la URL ${url}`);
});
