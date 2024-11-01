import { Factura } from "../Models/Factura.js";
import { Articulo } from "../Models/Articulo.js";

export const createFacturaController = async (req, res) => {
  try {
    const { fichaClinicaId, articulos } = req.body;
    const factura = await Factura.create({ fichaClinicaId, total: 0 });

    // Asociar los artículos a la factura
    for (const articuloData of articulos) {
      const articulo = await Articulo.create({ ...articuloData, facturaId: factura.id });
      factura.total += articulo.valor;
    }

    await factura.save();
    res.status(201).json(factura);
  } catch (error) {
    console.error("Error al crear factura:", error);
    res.status(500).json({ message: "Error al crear la factura" });
  }
};

export const indexFacturaController = async (req, res) => {
  try {
    const facturas = await Factura.findAll({ include: { model: Articulo, as: "articulos" } });
    res.status(200).json(facturas);
  } catch (error) {
    console.error("Error al obtener facturas:", error);
    res.status(500).json({ message: "Error al obtener las facturas" });
  }
};

export const updateFacturaController = async (req, res) => {
  try {
    const { id } = req.params;
    const { articulos } = req.body;
    const factura = await Factura.findByPk(id, { include: { model: Articulo, as: "articulos" } });

    if (!factura) return res.status(404).json({ message: "Factura no encontrada" });

    let total = 0;
    for (const articuloData of articulos) {
      let articulo = await Articulo.findByPk(articuloData.id);
      if (!articulo) {
        articulo = await Articulo.create({ ...articuloData, facturaId: factura.id });
      } else {
        await articulo.update({ ...articuloData });
      }
      total += articulo.valor;
    }

    factura.total = total;
    await factura.save();
    res.status(200).json(factura);
  } catch (error) {
    console.error("Error al actualizar factura:", error);
    res.status(500).json({ message: "Error al actualizar la factura" });
  }
};
