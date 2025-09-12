// Módulo para leer y procesar los bloques y horarios desde bloques_horarios.md
// Este módulo exporta funciones para obtener el bloque actual según la hora y el horario

const fs = require('fs');
const path = require('path');

// Usamos path.resolve para asegurar la ruta correcta en Vercel
const HORARIOS_FILE = path.resolve(process.cwd(), 'bloques_horarios.md');

function parseHorarios() {
    const content = fs.readFileSync(HORARIOS_FILE, 'utf8');
    const horarios = {};
    let currentHorario = null;
    const lines = content.split('\n');
    for (let line of lines) {
        let lin = line.trim();
        if (lin.startsWith('## ')) {
            currentHorario = lin.replace('## ', '').trim();
            horarios[currentHorario] = [];
        } else if (currentHorario && lin.startsWith('-')) {
            const match = lin.match(/-\s*(.+?):\s*(\d{1,2}:\d{2})\s*-\s*(\d{1,2}:\d{2})/);
            if (match) {
                horarios[currentHorario].push({
                    nombre: match[1],
                    inicio: match[2],
                    fin: match[3]
                });
            } else {
                // Para bloques sin hora (ej: Final de Jornada)
                const nombre = lin.replace('- ', '').replace(':', '').trim();
                horarios[currentHorario].push({ nombre });
            }
        }
    }
    return horarios;
}

function getBloqueActual(horario, horaActual) {
    // horario: string, horaActual: "HH:mm"
    const horarios = parseHorarios();
    const bloques = horarios[horario] || [];
    for (let bloque of bloques) {
        if (bloque.inicio && bloque.fin) {
            if (horaActual >= bloque.inicio && horaActual < bloque.fin) {
                return bloque.nombre;
            }
        }
    }
    // Si no está en ningún bloque, buscar "Final de Jornada" o retornar null
    const final = bloques.find(b => b.nombre.toLowerCase().includes('final'));
    return final ? final.nombre : null;
}

function detectarHorario(horaActual) {
    // Detecta automáticamente el horario según la hora actual
    // Devuelve el nombre del horario más probable
    const horarios = parseHorarios();
    let mejorHorario = null;
    let mejorBloque = null;
    for (let nombreHorario in horarios) {
        for (let bloque of horarios[nombreHorario]) {
            if (bloque.inicio && bloque.fin) {
                if (horaActual >= bloque.inicio && horaActual < bloque.fin) {
                    mejorHorario = nombreHorario;
                    mejorBloque = bloque.nombre;
                    break;
                }
            }
        }
        // if (mejorHorario) break;
    }
    return horarios;
}

module.exports = {
    parseHorarios,
    getBloqueActual,
    detectarHorario
};
