
import express from 'express';
import {
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperheroesController,
    buscarSuperheroesPorAtributoController,
    obtenerSuperheroesMayoresDe30Controller,
    agregarNuevoSuperheroeController,
    actualizarSuperheroeController,
    eliminarSuperheroePorIdController,
    eliminarSuperheroePorNombreController
} from '../controllers/superheroesController.mjs';

import { registerValidationRules } from '../middlewares/validationRules.mjs';
import { handleValidationErrors } from '../middlewares/errormiddleware.mjs';
import { renderizarFormularioEdicionController } from '../controllers/superheroesController.mjs';


const router = express.Router();

router.get('/heroes', obtenerTodosLosSuperheroesController);
router.post('/heroes/agregar', registerValidationRules(), handleValidationErrors, agregarNuevoSuperheroeController);
//router.put('/heroes/actualizar/:id', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
router.put('/heroes/:id', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
router.put('/heroes/editar', registerValidationRules(),handleValidationErrors, actualizarSuperheroeController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);
router.get('/heroes/mayores-30', obtenerSuperheroesMayoresDe30Controller);


router.delete('/heroes/eliminar/id/:id', eliminarSuperheroePorIdController);
router.delete('/heroes/eliminar/nombre/:nombre', eliminarSuperheroePorNombreController);
router.delete('/heroes/:id', eliminarSuperheroePorIdController);
// Ruta para la vista de edición de un superhéroe

router.get('/heroes/:id/edit', renderizarFormularioEdicionController);

router.get('/heroes/agregar',agregarNuevoSuperheroeController);


export default router;