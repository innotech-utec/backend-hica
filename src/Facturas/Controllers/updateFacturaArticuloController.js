import { Factura, FacturaArticulos } from "../models/index.js";
import Articulo from "../Models/Articulo.js";
import { v4 as uuidv4 } from 'uuid';

export const addOrUpdateFacturaArticuloController = async (req, res) => {
  try {
    const { facturaId, articuloId } = req.params;
    const { cantidad } = req.body;

    if (!facturaId || !articuloId || !cantidad) {
      return res.status(400).json({ message: "facturaId, articuloId y cantidad son requeridos" });
    }

    // Buscar la factura
    const factura = await Factura.findByPk(facturaId);
    if (!factura) {
      return res.status(404).json({ message: "Factura no encontrada" });
    }

    // Buscar el artículo
    const articulo = await Articulo.findByPk(articuloId);
    if (!articulo) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // Buscar primero el registro existente
    let facturaArticulo = await FacturaArticulos.findOne({
      where: { 
        facturaId: factura.id, 
        articuloId: articulo.id 
      }
    });

    if (facturaArticulo) {
      // Si existe, actualizar la cantidad
      await facturaArticulo.update({ cantidad });
    } else {
      // Si no existe, crear uno nuevo con UUID explícito
      facturaArticulo = await FacturaArticulos.create({
        id: uuidv4(),
        facturaId: factura.id,
        articuloId: articulo.id,
        cantidad
      });
    }

    // Calcular el nuevo total de la factura
    const articulosEnFactura = await Articulo.findAll({
      include: [{
        model: Factura,
        where: { id: facturaId },
        attributes: [],
        through: { attributes: ['cantidad'] }
      }]
    });

    const total = articulosEnFactura.reduce((sum, articulo) => {
      return sum + (articulo.valor * articulo.factura_articulos.cantidad);
    }, 0);

    // Actualizar el total en la factura
    await factura.update({ total });

    // Obtener la factura actualizada con sus artículos
    const facturaActualizada = await Factura.findByPk(facturaId, {
      include: [{
        model: Articulo,
        through: {
          attributes: ['cantidad']
        }
      }]
    });

    res.status(200).json(facturaActualizada);
  } catch (error) {
    console.error("Error al agregar/actualizar artículo en factura:", error);
    res.status(500).json({ message: "Error al procesar la operación", error: error.message });
  }
};