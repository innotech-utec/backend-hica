import { Factura } from "../Models/Factura.js";


export const createOrGetFacturaController = async (req, res) => {
  const { fichaClinicaId } = req.body;

  try {
    // Verificar si ya existe una factura para la ficha clínica
    let factura = await Factura.findOne({
      where: { fichaClinicaId },
      include: [{ all: true }]  // Incluye relaciones como artículos
    });

    // Si la factura no existe, crearla
    if (!factura) {
      factura = await Factura.create({ fichaClinicaId, total: 0, estado: 'PENDIENTE' });
    }

    res.status(200).json(factura);

  } catch (error) {
    console.error("Error al crear o recuperar la factura:", error);
    res.status(500).json({ message: "Error al procesar la operación", error: error.message });
  }
};
