import { FacturaArticulos } from "../Models/FacturaArticulo.js";
import  Articulo  from "../Models/Articulo.js";

export const createArticuloController = async (req, res) => {
  try {
    const { nombre,categoria, descripcion, valor, stock } = req.body;
    const articulo = await Articulo.create({ nombre,categoria, descripcion, valor, stock });
    res.status(201).json(articulo);
  } catch (error) {
    console.error("Error al crear artículo:", error);
    res.status(500).json({ message: "Error al crear el artículo" });
  }
};

export const createFacturaController = async (req, res) => {
  try {
    const { articulos } = req.body;
    for (const articulo of articulos) {
      const articuloDB = await Articulo.findByPk(articulo.id);
      if (articuloDB && articuloDB.stock >= articulo.cantidad) {
        await articuloDB.update({ stock: articuloDB.stock - articulo.cantidad });
      } else {
        return res.status(400).json({ message: `Stock insuficiente para el artículo ${articuloDB.nombre}` });
      }
    }
    res.status(201).json({ message: "Factura creada correctamente" });
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({ message: "Error al crear la factura" });
  }
};

export const indexArticuloController = async (req, res) => {
  try {
    const articulos = await Articulo.findAll();
    res.status(200).json(articulos);
  } catch (error) {
    console.error("Error al obtener artículos:", error);
    res.status(500).json({ message: "Error al obtener los artículos" });
  }
};

export const updateArticuloController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre,categoria, descripcion, valor, stock } = req.body;
    const articulo = await Articulo.findByPk(id);

    if (!articulo) return res.status(404).json({ message: "Artículo no encontrado" });

    await articulo.update({ nombre, categoria, descripcion, valor, stock });
    res.status(200).json(articulo);
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ message: "Error al actualizar el artículo" });
  }
};



export const adjustStock = async (req, res) => {
  const { articuloId } = req.params;
  const { cantidad, facturaId } = req.body;

  console.log("Valores recibidos en backend:", { articuloId, facturaId, cantidad });

  if (!facturaId || !articuloId) {
    return res.status(400).json({ message: "Se requieren facturaId y articuloId válidos" });
  }

  try {
    // Buscar la relación entre factura y artículo
    let facturaArticulo = await FacturaArticulos.findOne({
      where: { facturaId, articuloId },
    });

    const cantidadActualEnFactura = facturaArticulo ? facturaArticulo.cantidad : 0;

    // Verificar si se intenta aumentar la cantidad y hay suficiente stock
    const articulo = await Articulo.findByPk(articuloId);
    if (!articulo) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    const stockDisponible = articulo.stock;
    if (cantidad > cantidadActualEnFactura && (cantidad - cantidadActualEnFactura) > stockDisponible) {
      return res.status(400).json({ message: "Stock insuficiente" });
    }

    // Actualizar el stock del artículo
    await articulo.update({ stock: stockDisponible - (cantidad - cantidadActualEnFactura) });

    if (facturaArticulo) {
      // Si la relación ya existe, actualiza la cantidad
      await facturaArticulo.update({ cantidad });
    } else {
      // Si no existe, crea una nueva relación en factura_articulos
      facturaArticulo = await FacturaArticulos.create({
        facturaId,
        articuloId,
        cantidad,
      });
    }

    res.status(200).json({ message: "Stock ajustado correctamente" });
  } catch (error) {
    console.error("Error ajustando el stock:", error);
    res.status(500).json({ message: "Error ajustando el stock" });
  }
};
