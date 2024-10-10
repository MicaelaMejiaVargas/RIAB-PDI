const { Sequelize } = require('sequelize');

// Connectar a DB
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;

const database = new Sequelize(
  DB_NAME || 'riab', 
  DB_USER || 'root', 
  DB_PASSWORD || '', 
  {
    host: DB_HOST || '127.0.0.1',
    dialect: 'mysql'
  }
);

// Testeamos la conexión con la bd
(async () => {
  try {
    await database.authenticate();
    console.log('La conexión se ha establecido exitosamente.');
  } catch (error) {
    console.error('No se puede conectar a la base de datos:', error);
  }
})();

module.exports = database;