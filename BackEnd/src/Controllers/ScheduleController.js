import { getScheduleBlocks, updateScheduleBlock } from '../Models/ScheduleBlock.js';

async function detectSchedule(req, res) {
    try {
        const scheduleBlocks = await getScheduleBlocks();
        if(scheduleBlocks.length === 0) {
            return res.status(404).json({ message: 'No hay bloques de horario activos en este momento' });
        }
        res.status(200).json({ scheduleBlocks });
    } catch (error) {
        console.error('Error detecting schedule:', error);
        res.status(400).json({ error: 'Error detecting schedule' });
    }
}

async function changeSchedule(req, res) {
    try {
        const { password } = req.body;

        if (password !== process.env.SCHEDULE_CHANGE_PASSWORD) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const result = await updateScheduleBlock();
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró ningún horario para actualizar' });
        }
        res.status(200).json({ message: 'Horario actualizado correctamente' });

    } catch (error) {
        res.status(400).json({ message: 'Error al cambiar horario', error: error.message });
    }
}

export { detectSchedule, changeSchedule };
