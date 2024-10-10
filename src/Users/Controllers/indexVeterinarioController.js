import { Veterinario } from '../Models/Veterinarios.js';
import { User } from '../Models/User.js';

export const indexVeterinarioController = async (request, response) => {
  try {
    const veterinarios = await Veterinario.findAll({
      include: [{
        model: User,
        as: 'user',  
        attributes: ['id', 'nombre', 'apellido', 'email']  
      }],
      attributes: ['id', 'N_de_registro', 'Validado'],  
    });


    const veterinariosList = veterinarios.map(vet => ({
      id: vet.id,  
      N_de_registro: vet.N_de_registro,  
      Validado: vet.Validado,           
     
      user: {
        id: vet.user.id,
        nombre: vet.user.nombre,
        apellido: vet.user.apellido,
        email: vet.user.email,           
                    
      }
    }));

   
    return response.status(200).json(veterinariosList);
  } catch (error) {
    console.error('Error al obtener veterinarios:', error);
    return response.status(500).json({ message: 'Error al obtener veterinarios' });
  }
};
