
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const horarios = require('./horarios');

app.use(cors('https://apex-basic.netlify.app/'));
app.use(express.json());

let customTime = null;
let lastSet = null;
let manualHorario = null; // Si la coordinadora selecciona manualmente

// Obtener la hora actual (real o simulada)
function getCurrentTime() {
  if (customTime) {
    const now = Date.now();
    const elapsed = now - lastSet;
    return new Date(customTime.getTime() + elapsed);
  }
  return new Date();
}

// API: Obtener la hora actual
app.get('/api/time', (req, res) => {
  res.json({ time: getCurrentTime() });
});

// API: Configurar la hora simulada
app.post('/api/time', (req, res) => {
  const { hour, minute } = req.body;
  if (typeof hour === 'number' && typeof minute === 'number') {
    const now = new Date();
    customTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0);
    lastSet = Date.now();
    res.json({ success: true });
  } else {
    res.status(400).json({ success: false, error: 'Datos inválidos' });
  }
});

// API: Obtener el horario actual (detectado o manual)
app.get('/api/horario', (req, res) => {
  const now = getCurrentTime();
  const horaActual = now.toTimeString().slice(0,5); // "HH:mm"
  let horario = manualHorario;
  if (!horario) {
    horario = horarios.detectarHorario(horaActual);
  }
  res.json({ horario });
});

// API: Cambiar el horario manualmente (solo coordinadora)
app.post('/api/horario', (req, res) => {
  const { horario } = req.body;
  const allHorarios = Object.keys(horarios.parseHorarios());
  if (allHorarios.includes(horario)) {
    manualHorario = horario;
    res.json({ success: true, horario });
  } else {
    res.status(400).json({ success: false, error: 'Horario inválido' });
  }
});

// API: Obtener el bloque actual
app.get('/api/bloque', (req, res) => {
  const now = getCurrentTime();
  const horaActual = now.toTimeString().slice(0,5); // "HH:mm"
  let horario = manualHorario;
  if (!horario) {
    horario = horarios.detectarHorario(horaActual);
  }
  const bloque = horario ? horarios.getBloqueActual(horario, horaActual) : null;
  res.json({ horario, bloque, horaActual });
});

// API: Obtener todos los horarios y bloques (para frontend)
app.get('/api/horarios', (req, res) => {
  res.json(horarios.parseHorarios());
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Servidor backend de APEX_Basic escuchando en puerto ${PORT}`);
  });
}

module.exports = app;
