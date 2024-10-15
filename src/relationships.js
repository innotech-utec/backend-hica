import { FichaClinica } from './Animales/Models/FichaClinica.js';
import { ExamenObjetivo } from './Animales/Models/ExamenObjetivo.js';
import { Tratamiento } from './Animales/Models/Tratamiento.js';
import { RegistroParametros } from './Animales/Models/RegistroParametros.js';
import { Animal } from './Animales/Models/Animal.js';
import { Responsable } from './Responsables/Models/Responsable.js';
import { HistoriaClinica } from './Animales/Models/HistoriaClinica.js';
import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';


export default function setupRelationships() {


  //usuarui vet
  User.hasOne(Veterinario, { foreignKey: 'userId', as: 'veterinario' });
  Veterinario.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  // Relación entre Responsable y Animales (Responsable es propietario)
  Responsable.hasMany(Animal, { foreignKey: 'responsableId', as: 'animales', onDelete: 'CASCADE' });
  Animal.belongsTo(Responsable, { foreignKey: 'responsableId', as: 'responsable' });

  // Relación uno a uno entre Animal y Historia Clínica
  Animal.hasOne(HistoriaClinica, { foreignKey: 'animalId', as: 'historiaClinica', onDelete: 'CASCADE' });
  HistoriaClinica.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

  // Relaciones entre Historia Clínica y sus fichas clínicas
  HistoriaClinica.hasMany(FichaClinica, { foreignKey: 'historiaClinicaId', as: 'fichasClinicas', onDelete: 'CASCADE' });
  FichaClinica.belongsTo(HistoriaClinica, { foreignKey: 'historiaClinicaId', as: 'historiaClinica' });

  // Relación directa entre Animal y Ficha Clínica
  Animal.hasMany(FichaClinica, { foreignKey: 'animalId', as: 'fichasClinicasDirectas', onDelete: 'CASCADE' });
  FichaClinica.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

  // Relaciones entre Ficha Clínica y Examen Objetivo
  FichaClinica.hasOne(ExamenObjetivo, { foreignKey: 'fichaClinicaId', as: 'examenObjetivo', onDelete: 'CASCADE' });
  ExamenObjetivo.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });

  // Relaciones entre Ficha Clínica y Tratamientos
  FichaClinica.hasMany(Tratamiento, { foreignKey: 'fichaClinicaId', as: 'tratamientos', onDelete: 'CASCADE' });
  Tratamiento.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });

  // Relación entre Tratamiento y Veterinario
  Veterinario.hasMany(Tratamiento, { foreignKey: 'veterinarioId', as: 'tratamientos', onDelete: 'CASCADE' });
  Tratamiento.belongsTo(Veterinario, { foreignKey: 'veterinarioId', as: 'veterinario' });

  // Relación de Registro de Parámetros con Animal
  Animal.hasMany(RegistroParametros, { foreignKey: 'animalId', as: 'registroParametros', onDelete: 'CASCADE' });
  RegistroParametros.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });
}
