import {Router} from 'express';
import {changeSchedule, detectSchedule} from '../Controllers/ScheduleController.js';

const router = Router();

router.get('/schedule', detectSchedule);
router.post('/change-schedule', changeSchedule);

export {router};