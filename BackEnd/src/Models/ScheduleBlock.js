import db from '../config/db.js';

export async function getScheduleBlocks() {
    try {
        // Se obtiene la hora actual de Colombia.
        const currentTime = new Date().toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour12: false,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        // Usamos consultas preparadas para prevenir inyección SQL.
        // El '?' es un marcador de posición que será reemplazado de forma segura por el valor en el array.
        const query = `
            SELECT b.*, h.nombre AS nombre_horario 
            FROM bloque b 
            JOIN horario h ON b.fk_horario_bloque = h.id_horario 
            WHERE ? BETWEEN b.hora_inicio AND b.hora_final AND h.estado = 1`;

        const [rows] = await db.query(query, [currentTime]);
        return rows;
    } catch (error) {
        console.error('Error getting schedule blocks:', error);
        throw error;
    }
}

export async function updateScheduleBlock() {
    try {
        // Esta consulta es segura ya que no utiliza ninguna entrada externa.
        const sql = "UPDATE horario SET estado = CASE WHEN estado = 1 THEN 2 ELSE 1 END";
        const [result] = await db.query(sql);
        
        console.log('Status update result:', result);
        return result;
    } catch (error) {
        console.error('Error updating schedule status:', error);
        throw error;
    }
};

export async function getCurrentBlockName() {
    try {
        const currentTime = new Date().toLocaleTimeString("es-CO", {
            timeZone: "America/Bogota",
            hour12: false,
        });

        const query = `
            SELECT b.nombre_blo 
            FROM bloque b 
            JOIN horario h ON b.fk_horario_bloque = h.id_horario 
            WHERE ? BETWEEN b.hora_inicio AND b.hora_final AND h.estado = 1 
            LIMIT 1`;

        const [rows] = await db.query(query, [currentTime]);

        if (rows.length > 0) {
            return rows[0].nombre_blo;
        }
        return 'f'; // 'f' para fin de jornada si no se encuentra un bloque activo
    } catch (error) {
        console.error('Error getting current block name:', error);
        throw error;
    }
}
