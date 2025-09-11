// Datos estáticos para pruebas locales
const horarios = {
  'Mañana Normal': [
    { nombre: '1', inicio: '06:30', fin: '07:20' },
    { nombre: '2', inicio: '07:20', fin: '08:10' },
    { nombre: '3', inicio: '08:10', fin: '09:00' },
    { nombre: 'd', inicio: '09:00', fin: '09:30' },
    { nombre: '4', inicio: '09:30', fin: '10:20' },
    { nombre: '5', inicio: '10:20', fin: '11:10' },
    { nombre: '6', inicio: '11:10', fin: '12:00' },
    { nombre: '7', inicio: '12:00', fin: '12:45' },
    { nombre: 'f' }
  ],
  'Mañana Especial': [
    { nombre: 'A', inicio: '06:30', fin: '07:30' },
    { nombre: '1', inicio: '07:30', fin: '08:10' },
    { nombre: '2', inicio: '08:10', fin: '08:50' },
    { nombre: '3', inicio: '08:50', fin: '09:30' },
    { nombre: 'd', inicio: '09:30', fin: '10:00' },
    { nombre: '4', inicio: '10:00', fin: '10:40' },
    { nombre: '5', inicio: '10:40', fin: '11:20' },
    { nombre: '6', inicio: '11:20', fin: '12:00' },
    { nombre: '7', inicio: '12:00', fin: '12:45' },
    { nombre: 'f' }
  ],
  'Tarde Normal': [
    { nombre: '1', inicio: '13:00', fin: '13:45' },
    { nombre: '2', inicio: '13:45', fin: '14:30' },
    { nombre: '3', inicio: '14:30', fin: '15:15' },
    { nombre: 'd', inicio: '15:15', fin: '15:45' },
    { nombre: '4', inicio: '15:45', fin: '16:30' },
    { nombre: '5', inicio: '16:30', fin: '17:15' },
    { nombre: '6', inicio: '17:15', fin: '18:00' },
    { nombre: 'f' }
  ],
  'Tarde Especial': [
    { nombre: '1', inicio: '13:00', fin: '13:40' },
    { nombre: '2', inicio: '13:40', fin: '14:20' },
    { nombre: '3', inicio: '14:20', fin: '15:00' },
    { nombre: 'd', inicio: '15:00', fin: '15:30' },
    { nombre: '4', inicio: '15:30', fin: '16:10' },
    { nombre: '5', inicio: '16:10', fin: '16:50' },
    { nombre: '6', inicio: '16:50', fin: '17:25' },
    { nombre: 'A', inicio: '17:25', fin: '18:00' },
    { nombre: 'f' }
  ]
};


let tipoHorario = 'Normal'; // 'Normal' o 'Especial'

function detectarTurno(horaActual) {
  // horaActual en formato 'HH:mm'
  const [h, m] = horaActual.split(':').map(Number);
  // Mañana: 6:00 - 13:00, Tarde: 13:00 - 19:00
  if (h >= 6 && h < 13) return 'Mañana';
  if (h >= 13 && h < 19) return 'Tarde';
  return null;
}

function getHorarioActual(horaActual) {
  const turno = detectarTurno(horaActual);
  if (!turno) return null;
  return tipoHorario === 'Normal' ? `${turno} Normal` : `${turno} Especial`;
}

function getBloqueActual(horaActual) {
  const horario = getHorarioActual(horaActual);
  const bloques = horarios[horario] || [];
  for (let bloque of bloques) {
    if (bloque.inicio && bloque.fin) {
      if (horaActual >= bloque.inicio && horaActual < bloque.fin) {
        return bloque.nombre;
      }
    }
  }
  // Si no está en ningún bloque, buscar "f" (final)
  const final = bloques.find(b => b.nombre === 'f');
  return final ? final.nombre : '--';
}

function updateClock() {
  const clock = document.getElementById('clock');
  const bloqueDiv = document.getElementById('bloque');
  const bloqueDigito = document.getElementById('bloqueDigito');
  const horarioDiv = document.getElementById('horario');
  const now = new Date();
  let h = String(now.getHours()).padStart(2, '0');
  let m = String(now.getMinutes()).padStart(2, '0');
  let s = String(now.getSeconds()).padStart(2, '0');
  clock.textContent = `${h}:${m}:${s}`;

  const horaActual = `${h}:${m}`;
  const horarioActual = getHorarioActual(horaActual);
  const bloqueActual = getBloqueActual(horaActual);
  bloqueDigito.textContent = bloqueActual;
  bloqueDiv.textContent = '';
  horarioDiv.textContent = horarioActual ? `Jornada: ${horarioActual}` : '';
}

function setHorarioManual() {
  const select = document.getElementById('selectHorario');
  const tipo = select.value;
  if (tipo) {
    tipoHorario = tipo;
    updateClock();
  }
}

function cargarHorarios() {
  const select = document.getElementById('selectHorario');
  select.innerHTML = '';
  ['Normal', 'Especial'].forEach(tipo => {
    const option = document.createElement('option');
    option.value = tipo;
    option.textContent = tipo;
    select.appendChild(option);
  });
  select.value = tipoHorario;
}

window.onload = () => {
  cargarHorarios();
  setInterval(updateClock, 1000);
  updateClock();
};