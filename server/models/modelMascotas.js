const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura de la tabla mascotas
const mascotas = sequelize.define('mascotas', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  nombre_apodo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo nombre/apodo no puede estar vacío'
      },
      len: {
        args: [2, 50],
        msg: 'El nombre/apodo debe tener entre 2 y 50 caracteres.'
      },
      isValidNombre: function(value) {
        if (!/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/.test(value)) {
          throw new Error('El nombre/apodo solo puede contener letras y espacios.');
        }
      }
    }
  },
  especie: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo especie no puede estar vacío'
      },
      isIn: {
        args: [['perro', 'gato', 'loro', 'tortuga', 'conejo', 'pato', 'otro']],
        msg: 'La especie debe ser uno de los valores permitidos: perro, gato, loro, tortuga, conejo, pato, otro.'
      }
    }
  },
  raza: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El campo raza no puede estar vacío'
      },
      isIn: {
        args: [['labrador', 'bulldog', 'beagle', 'poodle', 'chihuahua', 'persa', 'siamés', 'bengalí', 'maine coon', 'holland lop', 'rex', 'agaporni', 'otro']],
        msg: 'La raza debe ser uno de los valores permitidos o "otro".'
      }
    }
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'color no definido',
    validate: {
      notEmpty: {
        msg: 'El campo color no puede estar vacío'
      },
      isIn: {
        args: [['negro', 'blanco', 'marrón', 'gris', 'otro']],
        msg: 'El color debe ser uno de los valores permitidos: negro, blanco, marrón, gris, otro.'
      }
    }
  },
  anio_nacimiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        msg: 'El año de nacimiento debe ser un número entero.'
      },
      isIn: {
        args: [[2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]],
        msg: 'El año de nacimiento debe estar entre el año 2000 y el 2024.'
      }
    }
  }
}, { timestamps: false });

// Sincronización del modelo con la base de datos
mascotas.sync({ force: false })
  .then(() => {
    console.log('Modelo de mascotas sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el modelo de mascotas:', err);
  });

module.exports = mascotas;