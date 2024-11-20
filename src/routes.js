

import express from 'express';
import { loginController } from './Auth/Controllers/loginController.js';
import { verifyTokenController } from './Auth/Controllers/verifyTokenController.js';
import { token } from './Auth/Middlewares/token.js';

import { indexUserController } from './Users/Controllers/indexUserController.js';
import { createUserController } from './Users/Controllers/createUserController.js';
import { deleteController } from './Users/Controllers/deleteController.js';
import { showController } from './Users/Controllers/showController.js';
import { showVeterinarioController } from './Users/Controllers/showVeterinarioController.js';
import { updateController } from './Users/Controllers/updateController.js';
import { indexResponsableController } from './Responsables/Controllers/indexResponsableController.js';
import { createResponsableController } from './Responsables/Controllers/createResponsableController.js';
import { showResponsableController } from './Responsables/Controllers/showResponsableController.js';
import { updateResponsableController } from './Responsables/Controllers/updateResponsableController.js';
import { deleteResponsableController } from './Responsables/Controllers/deleteResponsableController.js';
import { getDepartamentos } from './Responsables/Controllers/departamentoController.js';
import { getAnimalesByResponsableController } from './Responsables/Controllers/getAnimalesByResponsableController.js';

import { createAnimalController } from './Animales/Controllers/createAnimalController.js';
import { indexAnimalController } from './Animales/Controllers/indexAnimalController.js';
import { autorizacionController } from './Animales/Controllers/autorizacionController.js';
import { updateAnimalController } from './Animales/Controllers/updateAnimalController.js';


import { createFichaClinicaController } from './Animales/Controllers/createFichaClinicaController.js';
import { indexFichaClinicaController } from './Animales/Controllers/indexFichaClinicaController.js';
import { createExamenObjetivoController } from './Animales/Controllers/createExamenObjetivoController.js';
import { indexExamenObjetivoController } from './Animales/Controllers/indexExamenObjetivoController.js';
import { getExamenObjetivoByFichaController } from './Animales/Controllers/getExamenObjetivoByFichaController.js';

import { createTratamientoController } from './Animales/Controllers/createTratamientoController.js';
import { indexTratamientoController } from './Animales/Controllers/indexTratamientoController.js';
import { indexAllTratamientoController } from './Animales/Controllers/indexTratamientoController.js';
import { updateTratamientoController } from './Animales/Controllers/udpateTratamientoController.js';


import { createRegistroParametrosController } from './Animales/Controllers/createRegistroParametrosController.js';
import { indexRegistroParametrosController } from './Animales/Controllers/indexRegistroParametrosController.js';
import { getRegistroDeParametrosByFichaController } from './Animales/Controllers/getRegistroDeParametrosByFichaController.js';
import { udpateParametroController } from './Animales/Controllers/udpateParametroController.js';

import { getHistoriaClinicaController } from './Animales/Controllers/getHistoriaClinicaController.js';
import { createHistoriaClinicaController } from './Animales/Controllers/createHistoriaClinicaController.js';
import { showAnimalController } from './Animales/Controllers/showAnimalController.js';
import { indexFichaClinicaAbiertaController } from './Animales/Controllers/indexFichaClinicaAbiertaController.js';

import {getFichaClinicaByIdController} from './Animales/Controllers/ getFichaClinicaByIdController.js';
import { updateFichaClinicaController } from './Animales/Controllers/udpateFichaClinicaController.js';

// Importar el controlador de veterinario
import { createVeterinarioController } from './Users/Controllers/createVeterinarioController.js';
import { indexVeterinarioController } from './Users/Controllers/indexVeterinarioController.js';
import { updateVeterinarioController } from './Users/Controllers/updateVeterinarioController.js';
import { getTratamientosVeterinarioController } from './Animales/Controllers/getTratamientosVeterinarioController.js';
import { updateExamenObjetivoController } from './Animales/Controllers/udpateExamenObjetivoController.js';

//Reseña
import {uploadResenaController} from "../config/cloudinary.js"
import { getResenaImagenController } from './Animales/Controllers/getResenaImagenController.js';


import { createArticuloController } from './Facturas/Controllers/articuloController.js';
import { updateArticuloController } from './Facturas/Controllers/articuloController.js';
import { indexArticuloController } from './Facturas/Controllers/articuloController.js';

import { cerrarFacturaController } from './Facturas/Controllers/cerrarFacturaController.js';

import { addOrUpdateFacturaArticuloController } from './Facturas/Controllers/facturaArticuloController.js';
import { getArticulosFacturaController } from './Facturas/Controllers/facturaArticuloController.js';
import { createOrGetFacturaController } from './Facturas/Controllers/facturaController.js';
import { adjustStock} from './Facturas/Controllers/articuloController.js';

import {getAnimalesFallecidos} from './Reportes/Controllers/reportesControllers.js';
import {getAnimalesEutanasia} from './Reportes/Controllers/reportesControllers.js';
import {getVeterinariosTratamientos} from './Reportes/Controllers/reportesControllers.js';


const router = express.Router();

// Rutas de autenticación
router.post('/login', loginController);
router.get('/token/verify', verifyTokenController);

// Rutas de usuarios
router.get('/usuarios', token, indexUserController);
router.post('/usuarios', createUserController);  
router.delete('/usuarios/:id', token, deleteController);
router.get('/usuarios/:id', token, showController);
router.patch('/usuarios/:id', token, updateController);

// Rutas de responsables
router.get('/responsables', token, indexResponsableController); 
router.post('/responsables', token, createResponsableController); 
router.get('/responsables/:id', token, showResponsableController);
router.patch('/responsables/:id', token, updateResponsableController);
router.delete('/responsables/:id', token, deleteResponsableController);
router.get('/departamentos', getDepartamentos);
router.get('/responsables/:id/animales', token, getAnimalesByResponsableController);


// Rutas de animales
router.get('/animales', token, indexAnimalController); 
router.post('/animales', token, createAnimalController);
router.get('/animales/:id', token, showAnimalController);
router.patch('/animales/:animalId', token, updateAnimalController);

// Rutas de fichas clínicas
router.get('/fichasClinicas/animal/:animalId', token, indexFichaClinicaController);
router.get('/fichasClinicas/abiertas/:animalId', token, indexFichaClinicaAbiertaController); 
router.get('/fichasClinicas/:id', token, getFichaClinicaByIdController);
router.post('/fichasClinicas', token, createFichaClinicaController);
router.patch('/fichasClinicas/:fichaClinicaId', token, updateFichaClinicaController);


// Rutas de exámenes objetivos
router.get('/examenObjetivo/:animalId', token, indexExamenObjetivoController);
router.post('/examenObjetivo', token, createExamenObjetivoController);
router.get('/examenObjetivo/fichaClinica/:fichaClinicaId', token, getExamenObjetivoByFichaController);
router.patch('/examenObjetivo/:id',token, updateExamenObjetivoController);


// Rutas de tratamientos
router.get('/tratamientos/:fichaClinicaId', token, indexTratamientoController);
router.get('/tratamientos/veterinario/:veterinarioId', token, getTratamientosVeterinarioController);
router.post('/tratamientos', token, createTratamientoController);
router.get('/tratamientos', token, indexAllTratamientoController);
router.put('/tratamientos/:id/:nuevoEstado', autorizacionController);
router.patch('/tratamientos/:id',token, updateTratamientoController);

// Rutas de registros de parámetros
router.get('/registroParametros/:animalId', token, indexRegistroParametrosController);
router.post('/registroParametros', token, createRegistroParametrosController);
router.get('/registroParametros/fichaClinica/:fichaClinicaId', token, getRegistroDeParametrosByFichaController);
router.patch('/registroParametros/:id',token, udpateParametroController);

// Ruta de historia clínica completa
router.get('/historiaClinica/:animalId', token, getHistoriaClinicaController);
router.post('/historiaClinica', token, createHistoriaClinicaController);

// Agregar las rutas de veterinarios
router.get('/veterinarios', token, indexVeterinarioController);    
router.get('/veterinarios/:userId', token, showVeterinarioController);
router.post('/veterinarios', token, createVeterinarioController);  
router.patch('/veterinarios/:userId', updateVeterinarioController);
router.get('/veterinarios/:veterinarioId/tratamientos', getTratamientosVeterinarioController);

//Insumos
router.post('/articulos', token, createArticuloController); 
router.get('/articulos', token, indexArticuloController); 
router.patch('/articulos/:id', token, updateArticuloController); 
router.post('/articulos/:articuloId/ajustar-stock', adjustStock);

//Facturas
router.post('/facturas/:facturaId/cerrar', cerrarFacturaController);
router.post('/facturas/createOrGet', createOrGetFacturaController);
router.post('/facturas/:facturaId/articulos/:articuloId', addOrUpdateFacturaArticuloController);
router.get('/facturas/:facturaId/articulos', getArticulosFacturaController);


//Cargar reseña
router.post('/upload', uploadResenaController);
router.get('/resena/:fichaClinicaId', getResenaImagenController);

//reportes
router.get('/animales-fallecidos', getAnimalesFallecidos);
router.get('/animales-eutanasia', getAnimalesEutanasia);
router.get('/veterinarios-tratamientos', getVeterinariosTratamientos);

export { router };
