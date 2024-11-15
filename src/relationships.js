import { FichaClinica } from './Animales/Models/FichaClinica.js';
import { ExamenObjetivo } from './Animales/Models/ExamenObjetivo.js';
import { Tratamiento } from './Animales/Models/Tratamiento.js';
import { RegistroParametros } from './Animales/Models/RegistroParametros.js';
import { Animal } from './Animales/Models/Animal.js';
import { Responsable } from './Responsables/Models/Responsable.js';
import { HistoriaClinica } from './Animales/Models/HistoriaClinica.js';
import { User } from './Users/Models/User.js';
import { Veterinario } from './Users/Models/Veterinarios.js';
import { Departamento } from './Responsables/Models/Departamento.js';
import Articulo from './Facturas/Models/Articulo.js';
import { Factura } from './Facturas/Models/Factura.js';
import { FacturaArticulos } from './Facturas/Models/FacturaArticulo.js';
import { Reseña } from './Animales/Models/Reseña.js';

export default function setupRelationships() {
  User.hasOne(Veterinario, { foreignKey: 'userId', as: 'veterinario', onDelete: 'CASCADE' });
  Veterinario.belongsTo(User, { foreignKey: 'userId', as: 'user' });

  Responsable.hasMany(Animal, { foreignKey: 'responsableId', as: 'animales', onDelete: 'CASCADE' });
  Animal.belongsTo(Responsable, { foreignKey: 'responsableId', as: 'responsable' });

  Animal.hasOne(HistoriaClinica, { foreignKey: 'animalId', as: 'historiaClinica', onDelete: 'CASCADE' });
  HistoriaClinica.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

  HistoriaClinica.hasMany(FichaClinica, { foreignKey: 'historiaClinicaId', as: 'fichasClinicas', onDelete: 'CASCADE' });
  FichaClinica.belongsTo(HistoriaClinica, { foreignKey: 'historiaClinicaId', as: 'historiaClinica' });

  Animal.hasMany(FichaClinica, { foreignKey: 'animalId', as: 'fichasClinicasDirectas', onDelete: 'CASCADE' });
  FichaClinica.belongsTo(Animal, { foreignKey: 'animalId', as: 'animal' });

  FichaClinica.hasOne(ExamenObjetivo, { foreignKey: 'fichaClinicaId', as: 'examenObjetivo', onDelete: 'CASCADE' });
  ExamenObjetivo.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });

  FichaClinica.hasMany(Tratamiento, { foreignKey: 'fichaClinicaId', as: 'tratamientos', onDelete: 'CASCADE' });
  Tratamiento.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });

  Veterinario.hasMany(Tratamiento, { foreignKey: 'veterinarioId', as: 'tratamientos', onDelete: 'CASCADE' });
  Tratamiento.belongsTo(Veterinario, { foreignKey: 'veterinarioId', as: 'veterinario' });

  FichaClinica.hasMany(RegistroParametros, { foreignKey: 'fichaClinicaId', as: 'registroParametros', onDelete: 'CASCADE' });
  RegistroParametros.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });

  Departamento.hasMany(Responsable, { foreignKey: 'departamentoId', as: 'responsables' });
  Responsable.belongsTo(Departamento, { foreignKey: 'departamentoId', as: 'departamento' });

  FichaClinica.hasOne(Factura, { foreignKey: "fichaClinicaId", as: "factura", onDelete: "CASCADE" });
  Factura.belongsTo(FichaClinica, { foreignKey: "fichaClinicaId", as: "fichaClinica" });

  Factura.belongsToMany(Articulo, { through: FacturaArticulos,foreignKey: 'facturaId' });
  
  Articulo.belongsToMany(Factura, { through: FacturaArticulos, foreignKey: 'articuloId' });

  FichaClinica.hasOne(Reseña, { foreignKey: 'fichaClinicaId', as: 'reseña', onDelete: 'CASCADE' });
  Reseña.belongsTo(FichaClinica, { foreignKey: 'fichaClinicaId', as: 'fichaClinica' });
}
