import { Articulo } from "../Models/Articulo.js";

export const createArticuloController = async (req, res) => {
  try {
    const { nombre, descripcion, valor, stock } = req.body;
    const articulo = await Articulo.create({ nombre, descripcion, valor, stock });
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
    const { nombre, descripcion, valor, stock } = req.body;
    const articulo = await Articulo.findByPk(id);

    if (!articulo) return res.status(404).json({ message: "Artículo no encontrado" });

    await articulo.update({ nombre, descripcion, valor, stock });
    res.status(200).json(articulo);
  } catch (error) {
    console.error("Error al actualizar artículo:", error);
    res.status(500).json({ message: "Error al actualizar el artículo" });
  }
};
