import {Router} from 'express';
import {cambiarHorario, detectarHorario} from '../Controllers/horarioController.js';

const router = Router();

router.get('/horario', detectarHorario);
router.get('/cambiar-horario', cambiarHorario);

export {router};