import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";

const Articulo = sequelize.define('articulo', {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  valor: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock: {  
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
});

export { Articulo };
