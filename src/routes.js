// routes.js (archivo donde defines tus rutas)

import express from 'express';
import { loginController } from './Auth/Controllers/loginController.js';
import { verifyTokenController } from './Auth/Controllers/verifyTokenController.js';
import { token } from './Auth/Middlewares/token.js';

// Importación de los controladores (asegúrate de tener estos controladores creados y exportados correctamente)
import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { deleteController } from './Users/Controllers/deleteController.js';
import { showController } from './Users/Controllers/showController.js';
import { updateController } from './Users/Controllers/updateController.js';
import { indexResponsableController } from './Responsables/Controllers/indexResponsableController.js';
import { createResponsableController } from './Responsables/Controllers/createResponsableController.js';
import { showResponsableController } from './Responsables/Controllers/showResponsableController.js';

import { createAnimalController } from './Animales/Controllers/createAnimalController.js';
import { indexAnimalController } from './Animales/Controllers/indexAnimalController.js';

import { createFichaClinicaController } from './Animales/Controllers/createFichaClinicaController.js';
import { indexFichaClinicaController } from './Animales/Controllers/indexFichaClinicaController.js';
import { createExamenObjetivoController } from './Animales/Controllers/createExamenObjetivoController.js';
import { indexExamenObjetivoController } from './Animales/Controllers/indexExamenObjetivoController.js';
import { createTratamientoController } from './Animales/Controllers/createTratamientoController.js';
import { indexTratamientoController } from './Animales/Controllers/indexTratamientoController.js';
import { createRegistroParametrosController } from './Animales/Controllers/createRegistroParametrosController.js';
import { indexRegistroParametrosController } from './Animales/Controllers/indexRegistroParametrosController.js';
import { getHistoriaClinicaController } from './Animales/Controllers/getHistoriaClinicaController.js';
import { createHistoriaClinicaController } from './Animales/Controllers/createHistoriaClinicaController.js';
import { showAnimalController } from './Animales/Controllers/showAnimalController.js';
import { indexFichaClinicaAbiertaController } from './Animales/Controllers/indexFichaClinicaAbiertaController.js';

import {getFichaClinicaByIdController} from './Animales/Controllers/ getFichaClinicaByIdController.js';

// Importar el controlador de veterinario
import { createVeterinarioController } from './Users/Controllers/createVeterinarioController.js';
import { indexVeterinarioController } from './Users/Controllers/indexVeterinarioController.js';

const router = express.Router();

// Rutas de autenticación
router.post('/login', loginController);
router.get('/token/verify', verifyTokenController);

// Rutas de usuarios
router.get('/usuarios', token, indexUserController);
router.post('/usuarios', createUserController);  // Ruta de creación de usuario (sin middleware para registro)
router.delete('/usuarios/:id', token, deleteController);
router.get('/usuarios/:id', token, showController);
router.patch('/usuarios/:id', token, updateController);

// Rutas de responsables
router.get('/responsables', token, indexResponsableController); 
router.post('/responsables', token, createResponsableController); 
router.get('/responsables/:id', token, showResponsableController);

// Rutas de animales
router.get('/animales', token, indexAnimalController); 
router.post('/animales', token, createAnimalController);
router.get('/animales/:id', token, showAnimalController);

// Rutas de fichas clínicas
router.get('/fichasClinicas/:animalId', token, indexFichaClinicaController);
router.get('/fichasClinicas/abiertas/:animalId', token, indexFichaClinicaAbiertaController); // Ruta para obtener fichas clínicas abiertas
router.get('/fichasClinicas/:id', token, getFichaClinicaByIdController);
router.post('/fichasClinicas', token, createFichaClinicaController);

// Rutas de exámenes objetivos
router.get('/examenObjetivo/:animalId', token, indexExamenObjetivoController);
router.post('/examenObjetivo', token, createExamenObjetivoController);

// Rutas de tratamientos
router.get('/tratamientos/:animalId', token, indexTratamientoController);
router.post('/tratamientos', token, createTratamientoController);

// Rutas de registros de parámetros
router.get('/registroParametros/:animalId', token, indexRegistroParametrosController);
router.post('/registroParametros', token, createRegistroParametrosController);

// Ruta de historia clínica completa
router.get('/historiaClinica/:animalId', token, getHistoriaClinicaController);
router.post('/historiaClinica', token, createHistoriaClinicaController);

// Agregar las rutas de veterinarios
router.get('/veterinarios', token, indexVeterinarioController);    // Ruta para obtener veterinarios
router.post('/veterinarios', token, createVeterinarioController);  // Ruta para crear veterinarios

// Exportar el router
export { router };
