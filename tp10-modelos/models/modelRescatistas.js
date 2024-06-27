const { Sequelize } = require('sequelize');
const sequelize = require('../config/db_sequelize');

// Definir la estructura de la tabla rescatistas
const Rescatista = sequelize.define('Rescatista', {
    dni: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        validate: {
          isInt: {
            msg: 'El DNI debe ser un número entero'
          },
          notEmpty: { msg: 'Este campo No puede estar vacio' },
          validarDni(value) {
            if (!value || value.length < 8) {
              throw new Error('DNI inválido! Debe tener al menos 8 digitos');
            }
          }
        }
    },
    nombre: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
              args: [3, 50],
              msg: 'Nombre inválido: debe tener entre 3 y 50 caracteres'
            },
            notEmpty: true
        }
    },
    apellido: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: {
              args: [3, 50],
              msg: 'Apellido inválido: debe tener entre 3 y 50 caracteres'
            },
            notEmpty: true
        }
      
    },
    telefono: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          isNumeric: {
            msg: 'El teléfono debe contener solo números'
          },
          len: {
            args: [7, 15],
            msg: 'Número de Teléfono inválido: debe tener entre 7 y 15 caracteres'
          },
          notEmpty: true
        }
    }, 
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: {
              msg: "Formato de email inválido."
            },
            notEmpty: true
        }
    },
    direccion: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Este campo no puede estar vacío'
          },
          len: {
            args: [0, 255],
            msg: 'Dirección inválida: máximo 255 caracteres'
          }
        }
    },
    genero: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isInt: false,
          isIn: {
            args: [['M', 'F', 'Otro']],
            msg: 'Género inválido: debe ser Masculino, Femenino u Otro'
          }
        }
    },
}, {
  timestamps: false
})

Rescatista.sync({ force: false })
  .then(() => {
    console.log('Modelo de Rescatista sincronizado correctamente');
  })
  .catch(err => {
    console.error('Error al sincronizar el Modelo de Rescatista:', err);
  }
);

module.exports = Rescatista;
