import { getHorarioBloques } from '../Models/horario_bloque.js';

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

export default detectarHorario;


