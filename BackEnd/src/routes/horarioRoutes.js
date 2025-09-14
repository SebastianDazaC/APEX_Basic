import {Router} from 'express';
import detectarHorario from '../Controllers/horarioController.js';

const router = Router();

router.get('/horario', detectarHorario);

export {router};