import { Factura } from "../Models/Factura.js";
import Articulo from "../Models/Articulo.js";
import { FichaClinica } from "../../Animales/Models/FichaClinica.js";
import { Animal } from "../../Animales/Models/Animal.js";
import { Responsable } from "../../Responsables/Models/Responsable.js";

export const cerrarFacturaController = async (req, res) => {
    const { facturaId } = req.params;
  
    try {
      const factura = await Factura.findByPk(facturaId, {
        include: [
          {
            model: Articulo,
            as: 'articulos',
            through: { attributes: ['cantidad'] }
          },
          {
            model: FichaClinica,
            as: 'fichaClinica',
            include: [
              {
                model: Animal,
                as: 'animal',
                include: [
                  {
                    model: Responsable,
                    as: 'responsable'
                  }
                ]
              }
            ]
          }
        ]
      });
  
      if (!factura) {
        return res.status(404).json({
          success: false,
          message: "Factura no encontrada"
        });
      }
  
      const totalFactura = factura.articulos.reduce((acc, articulo) => {
        const cantidad = articulo.FacturaArticulos?.cantidad || 0;
        return acc + (articulo.valor * cantidad);
      }, 0);
  
      await factura.update({ total: totalFactura });
  
      res.json({
        success: true,
        factura: {
          id: factura.id,
          fecha: factura.createdAt,
          total: totalFactura,
          animal: factura.fichaClinica?.animal || null,
          responsable: factura.fichaClinica?.animal?.responsable || null,
          articulos: factura.articulos.map(articulo => ({
            nombre: articulo.nombre,
            cantidad: articulo.FacturaArticulos?.cantidad || 0,
            valor: articulo.valor,
            total: articulo.valor * (articulo.FacturaArticulos?.cantidad || 0)
          }))
        }
      });
  
    } catch (error) {
      console.error('Error al cerrar la factura:', error);
      res.status(500).json({
        success: false,
        message: 'Error al cerrar la factura',
        error: error.message
      });
    }
  };
  