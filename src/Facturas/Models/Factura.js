import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import Articulo from "./Articulo.js";

export const Factura = sequelize.define('factura', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  fichaClinicaId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
 
});
