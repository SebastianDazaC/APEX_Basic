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

        const query = 'SELECT b.*, h.nombre AS nombre_horario FROM bloque b JOIN horario h ON b.fk_horario_bloque = h.id_horario WHERE "08:00:00" BETWEEN b.hora_inicio AND b.hora_final AND h.estado = 1';

        const [rows] = await db.query(query);
        console.log(rows)
        return rows;
    } catch (error) {
        console.error('Error al obtener los horarios de bloques:', error);
        throw error;
    }
}

export async function updateHorarioBloque() {
    try {
        const sql = "UPDATE horario SET estado = CASE WHEN estado = 1 THEN 2 ELSE 1 END";
        const [result] = await db.query(sql);
        console.log(result);
        return result;
    } catch (error) {
        console.error('Error al actualizar el estado del horario:', error);
        throw error;
    }
};




