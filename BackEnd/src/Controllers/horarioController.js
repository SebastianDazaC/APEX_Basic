import { getHorarioBloques, updateHorarioBloque } from '../Models/horario_bloque.js';

async function detectarHorario(req, res) {
    try {
        const horarioBloques = await getHorarioBloques();
        if(horarioBloques.length === 0) {
            return res.status(404).json({ message: 'No hay bloques de horario activos en este momento' });
        }
        res.status(200).json({ horarioBloques });
    } catch (error) {
        console.error('Error al detectar horario:', error);
        res.status(400).json({ error: 'Error al detectar horario' });
    }
}

async function cambiarHorario(req, res) {
    try {
        const result = await updateHorarioBloque();
        if(result.affectedRows === 0) {
            return res.status(404).json({ message: 'No se encontró ningún horario para actualizar' });
        }
        res.status(200).json({ message: 'Horario actualizado correctamente' });

    } catch (error) {
        res.status(400).json({ message: 'Error al cambiar horario', error: error.message });
    }
}

export { detectarHorario, cambiarHorario };


