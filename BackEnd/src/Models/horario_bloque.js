import db from '../config/db.js';

export async function getHorarioBloques() {
    try {
        const hora = new Date().toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        })

        const query = 'SELECT b.*, h.nombre AS nombre_horario FROM bloque b JOIN horario h ON b.fk_horario_bloque = h.id_horario WHERE "08:00" BETWEEN b.hora_inicio AND b.hora_final AND h.estado = 1';

        const [rows] = await db.query(query, [hora]);
        console.log(rows)
        return rows;
    } catch (error) {
        console.error('Error al obtener los horarios de bloques:', error);
        throw error;
    }
}

export const updateHorarioBloque = (req, res) => {
    const { id } = req.params;
    const { estado } = req.body;
    const query = 'UPDATE horario SET estado = ? WHERE id = ?';

    db.query(query, [estado, id], (err, result) => {
        if (err) {
            console.error('Error al actualizar el horario de bloque:', err);
            return res.status(500).json({ error: 'Error al actualizar el horario de bloque' });
        }
        res.status(200).json({ message: 'Horario de bloque actualizado exitosamente' });
    });
};




