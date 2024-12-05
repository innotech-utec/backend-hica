import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Animal = sequelize.define('animales', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
    validate: {
        isUUID: 4
    }
},
nombre: {
  type: DataTypes.STRING(50),
  allowNull: false,
  validate: {
      notEmpty: {
          msg: 'El nombre no puede estar vacío'
      },
      len: {
          args: [2, 50],
          msg: 'El nombre debe tener entre 2 y 50 caracteres'
      },
      is: {
          args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          msg: 'El nombre solo puede contener letras y espacios'
      },
      notOnlySpaces(value) {
          if (value.trim().length === 0) {
              throw new Error('El nombre no puede contener solo espacios');
          }
          if (value.includes('  ')) {
              throw new Error('El nombre no puede contener espacios dobles');
          }
      }
  }
},
especie: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: {
      notEmpty: {
          msg: 'La especie no puede estar vacío'
      },
      len: {
          args: [2, 50],
          msg: 'La especie debe tener entre 2 y 50 caracteres'
      },
      is: {
          args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          msg: 'La especie solo puede contener letras y espacios'
      },
      notOnlySpaces(value) {
          if (value.trim().length === 0) {
              throw new Error('La especie no puede contener solo espacios');
          }
          if (value.includes('  ')) {
              throw new Error('La especie no puede contener espacios dobles');
          }
      }
  }
},
raza: {
  type: DataTypes.STRING(20),
  allowNull: false,
  validate: {
      len: {
          args: [2, 50],
          msg: 'La raza debe tener entre 2 y 50 caracteres'
      },
      is: {
          args: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
          msg: 'La raza solo puede contener letras y espacios'
      },
      notOnlySpaces(value) {
          if (value.trim().length === 0) {
              throw new Error('La raza no puede contener solo espacios');
          }
          if (value.includes('  ')) {
              throw new Error('La raza no puede contener espacios dobles');
          }
      }
  }
},
edadValor: {
  type: DataTypes.DECIMAL(5, 2),
  allowNull: false,
  validate: {
    isNumeric: {
      msg: 'El valor de la edad debe ser un número'
    },
    min: {
      args: [0],
      msg: 'La edad no puede ser negativa'
    },
    max: {
      args: [100],
      msg: 'La edad no puede ser tan alta, pruebe otra unidad'
    }
  },
  field: 'edad_valor'
},
edadUnidad: {
  type: DataTypes.ENUM('AÑOS', 'MESES', 'SEMANAS', 'DIAS'),
  allowNull: false,
  validate: {
    isIn: {
      args: [['AÑOS', 'MESES', 'SEMANAS', 'DIAS']],
      msg: 'La unidad de edad debe ser AÑOS, MESES, SEMANAS o DIAS'
    }
  },
  field: 'edad_unidad'
},

  sexo: {
    type: DataTypes.ENUM('HEMBRA', 'MACHO'),
    allowNull: false,
  },
  peso: {
    type: DataTypes.DECIMAL(5, 2), // Se asume un valor máximo de 999.99 kg
    allowNull: true,
  },
  responsableId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

Animal.paginate = async (records, page) => {
  const animales = await Animal.findAll({
      limit: records,
      offset: records * (page - 1)
  });

  const lastPage = Math.ceil((await Animal.count()) / records);

  return {
      data: animales,
      meta: {
          current: page,
          records: records,
          next: (lastPage >= page + 1) ? page + 1 : null,
          last: lastPage
      }
  };
}


export { Animal };
