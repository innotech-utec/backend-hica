import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Responsable = sequelize.define('responsables', {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  documento: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  domicilio: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  departamentoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  localidadId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  timestamps: true,
  paranoid: true,
});

Responsable.paginate = async (records, page) => {
  const responsable = await Responsable.findAll({
      limit: records,
      offset: records * (page - 1)
  });

  const lastPage = Math.ceil((await Responsable.count()) / records);

  return {
      data: responsable,
      meta: {
          current: page,
          records: records,
          next: (lastPage >= page + 1) ? page + 1 : null,
          last: lastPage
      }
  };
}

export { Responsable };
