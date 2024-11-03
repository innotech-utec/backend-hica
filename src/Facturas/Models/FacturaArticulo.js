import { DataTypes } from "sequelize";
import { sequelize } from "../../database.js";
import Articulo from "./Articulo.js";
import { Factura } from "./Factura.js";


export const FacturaArticulos = sequelize.define('factura_articulos', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    facturaId: {
        type: DataTypes.INTEGER,       
      references: {
        model: Factura,
        key: 'id'
      },
      allowNull: false
    },
    articuloId: {
      type: DataTypes.UUID,
      references: {
        model: Articulo,
        key: 'id'
      },
      allowNull: false
    },
    cantidad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    }
  });