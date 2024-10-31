import { Departamento } from "../Models/Departamento.js";


export const getDepartamentos = async (req, res) => {
  try {
    const departamentos = await Departamento.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json(departamentos);
  } catch (error) {
    console.error('Error al obtener departamentos:', error);
    res.status(500).json({ 
      message: 'Error al obtener los departamentos' 
    });
  }
};
