import { Factura } from "../Models/Factura.js";
import  Articulo  from "../Models/Articulo.js";



export const addOrUpdateFacturaArticuloController = async (req, res) => {
  try {
    const { facturaId, articuloId } = req.params;
    const { cantidad } = req.body;

    // Validar entrada
    if (!facturaId || !articuloId || !cantidad) {
      return res.status(400).json({ 
        message: "facturaId, articuloId y cantidad son requeridos" 
      });
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

    // Agregar o actualizar el artículo en la factura
    await factura.addArticulo(articulo, {
      through: { cantidad }
    });

    // Calcular el nuevo total
    const articulosEnFactura = await factura.getArticulos();
    const total = articulosEnFactura.reduce((sum, item) => {
      return sum + (item.valor * item.cantidad);
    }, 0);

    // Actualizar el total de la factura
    await factura.update({ total });

    // Retornar la factura actualizada con sus artículos
    const facturaActualizada = await Factura.findByPk(facturaId, {
      include: [{
        model: Articulo,
        attributes: ['id', 'nombre', 'valor']
      }]
    });

    res.status(200).json(facturaActualizada);

  } catch (error) {
    console.error("Error al agregar/actualizar artículo en factura:", error);
    res.status(500).json({ 
      message: "Error al procesar la operación",
      error: error.message 
    });
  }
};

export const getArticulosFacturaController = async (req, res) => {
    try {
      const { facturaId } = req.params;
  
      const factura = await Factura.findByPk(facturaId, {
        include: [{
          model: Articulo,
          through: {
            attributes: ['cantidad']  // Asegúrate de incluir el campo 'cantidad'
          }
        }]
      });
  
      if (!factura) {
        return res.status(404).json({ message: "Factura no encontrada" });
      }
  
      res.status(200).json(factura.articulos);
    } catch (error) {
      console.error("Error al obtener artículos de la factura:", error);
      res.status(500).json({ message: "Error al obtener los artículos", error: error.message });
    }
  };
  