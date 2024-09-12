const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura de la tabla mascotas
const mascotas = sequelize.define('mascotas', {
  id: {
    type: Sequelize.INTEGER, //debe ser de caracter entero
    allowNull: false, //el campo no puede estar vacio  en la bd
    primaryKey: true, //es clave primaria
    autoIncrement: true //incrementara si no se le asigna un valor
  },

  nombre_apodo: {
    type: Sequelize.STRING, //debe ser de caracter string
    allowNull: false, //el campo no puede estar vacio
    validate: {
      isString: function(valorMascota) {
        if (typeof valorMascota !== 'string') {
          throw new Error('El nombre/apodo debe ser un string');
        }
      }
    }
  },
  especie: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo especie no puede estar vacío'
      }
    }
  },

  raza: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo raza no puede estar vacío'
      }
    }
  },

  color: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'color no definido'
  },

  estado_salud: {
    type: Sequelize.STRING,
    allowNull: false, //el campo no puede estar vacio
    validate: {
      isString: function(valorMascotaSalud) {
        if (typeof valorMascotaSalud !== 'string') {
          throw new Error('Error, el dato ingresado no es de tipo string');
        }
      }
    }
  },

  anio_nacimiento: {
    type: Sequelize.INTERGER,
    allowNull: false,
    validate: {
      isInt: true,
      isString: false,
    }
  }
},

{timestamps: false });

// Sincronización del modelo con la base de datos
mascotas.sync({ force: false })
  .then(() => {
    console.log('Modelo de mascotas sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo de mascotas:', err);
  });

module.exports = mascotas;