// ./Animales/Models/Animal.js
import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js"; // Asegúrate de que esta ruta sea correcta

const Animal = sequelize.define('animales', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  especie: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  raza: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  responsableId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
}, {
  timestamps: true,  
  paranoid: true,

});

Animal.paginate = async (records = 10, page = 1) => {
  const offset = records * (page - 1);

  // Obtener los registros con el límite y el offset
  const animales = await Animal.findAll({
    limit: records,
    offset: offset,
    include: [
      {
        model: sequelize.models.Responsable, // Incluir el modelo `Responsable`
        as: 'responsable',
      }
    ]
  });

  // Contar el total de registros
  const totalRecords = await Animal.count();
  const lastPage = Math.ceil(totalRecords / records);

  return {
    data: animales, // Corregido para devolver `animales`
    meta: {
      current: page,
      records: records,
      next: (lastPage >= page + 1) ? page + 1 : null,
      last: lastPage,
      totalRecords: totalRecords,
    },
  };
};


export { Animal };
