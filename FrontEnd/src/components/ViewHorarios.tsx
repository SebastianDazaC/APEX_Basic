import { useState } from "react";

// Tipos TypeScript para la estructura de datos
interface Horario {
  nombre: string;
  inicio: string;
  fin: string;
}

interface Jornada {
  id: number;
  Descripcion: string;
  Horarios: Horario[];
}

// Mock data basado en tu JSON
const mockJornadas: Jornada[] = [
  {
    id: 1,
    Descripcion: "Mañana Normal",
    Horarios: [
      { nombre: "BLOQUE 1", inicio: "06:30", fin: "07:20" },
      { nombre: "BLOQUE 2", inicio: "07:20", fin: "08:10" },
      { nombre: "BLOQUE 3", inicio: "08:10", fin: "09:00" },
      { nombre: "DESCANSO", inicio: "09:00", fin: "09:30" },
      { nombre: "BLOQUE 4", inicio: "09:30", fin: "10:20" },
      { nombre: "BLOQUE 5", inicio: "10:20", fin: "11:10" },
      { nombre: "BLOQUE 6", inicio: "11:10", fin: "12:00" },
      { nombre: "BLOQUE 7", inicio: "12:00", fin: "12:45" }
    ]
  },
  {
    id: 2,
    Descripcion: "Mañana Especial",
    Horarios: [
      { nombre: "ANIMACION", inicio: "06:30", fin: "07:30" },
      { nombre: "BLOQUE 1", inicio: "07:30", fin: "08:10" },
      { nombre: "BLOQUE 2", inicio: "08:10", fin: "08:50" },
      { nombre: "BLOQUE 3", inicio: "08:50", fin: "09:30" },
      { nombre: "DESCANSO", inicio: "09:30", fin: "10:00" },
      { nombre: "BLOQUE 4", inicio: "10:00", fin: "10:40" },
      { nombre: "BLOQUE 5", inicio: "10:40", fin: "11:20" },
      { nombre: "BLOQUE 6", inicio: "11:20", fin: "12:00" },
      { nombre: "BLOQUE 7", inicio: "12:00", fin: "12:45" }
    ]
  }
];

export function ViewHorarios() {
  const [jornada] = useState(mockJornadas[1]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:via-gray-900 dark:to-black p-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-red-400 dark:text-red-300 font-black text-2xl sm:text-3xl tracking-wider mb-2">
            APEX TimeAC
          </h1>
          <p className="text-gray-400 dark:text-gray-500 text-sm sm:text-base">
            Sistema de Horarios Académicos
          </p>
        </header>


        {/* Horarios Display */}
        {
          <div className="bg-gray-800/50 dark:bg-gray-900/80 backdrop-blur-sm border border-red-500/30 dark:border-red-400/40 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-red-400 dark:text-red-300 font-bold text-xl sm:text-2xl">
                {
                  jornada.Descripcion
                }
              </h2>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-sm font-medium">En vivo</span>
              </div>
            </div>

            {/* Horarios Grid */}
            <div className="grid gap-3 sm:gap-4">
              {jornada.Horarios.map((horario, index) => {
                const isActive = false;
                const isDescanso = horario.nombre.includes('DESCANSO');
                const isAnimacion = horario.nombre.includes('ANIMACION');
                
                return (
                  <div
                    key={index}
                    className={`
                      relative p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]
                      ${isActive 
                        ? 'bg-red-500/20 border-red-400 shadow-lg shadow-red-500/20' 
                        : 'bg-gray-700/30 border-gray-600/50 hover:bg-gray-700/50'
                      }
                      ${isDescanso ? 'bg-blue-500/10 border-blue-500/30' : ''}
                      ${isAnimacion ? 'bg-purple-500/10 border-purple-500/30' : ''}
                    `}
                  >
                    {isActive && (
                      <div className="absolute -top-2 -right-2">
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                          ACTIVO
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`
                          w-3 h-3 rounded-full
                          ${isActive ? 'bg-red-400 animate-pulse' : 
                            isDescanso ? 'bg-blue-400' :
                            isAnimacion ? 'bg-purple-400' : 'bg-gray-400'}
                        `}></div>
                        <h3 className={`
                          font-semibold text-sm sm:text-base
                          ${isActive ? 'text-red-300' : 
                            isDescanso ? 'text-blue-300' :
                            isAnimacion ? 'text-purple-300' : 'text-gray-300'}
                        `}>
                          {horario.nombre}
                        </h3>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <time className={`
                          font-mono text-sm sm:text-base font-medium
                          ${isActive ? 'text-red-200' : 'text-gray-400'}
                        `}>
                          {horario.inicio}
                        </time>
                        <span className={`
                          text-xs
                          ${isActive ? 'text-red-300' : 'text-gray-500'}
                        `}>
                          -
                        </span>
                        <time className={`
                          font-mono text-sm sm:text-base font-medium
                          ${isActive ? 'text-red-200' : 'text-gray-400'}
                        `}>
                          {horario.fin}
                        </time>
                      </div>
                    </div>
                    
                    {/* Duration indicator */}
                    <div className="mt-2 text-xs text-gray-500">
                      {(() => {
                        const start = horario.inicio.split(':').map(Number);
                        const end = horario.fin.split(':').map(Number);
                        const startMinutes = start[0] * 60 + start[1];
                        const endMinutes = end[0] * 60 + end[1];
                        const duration = endMinutes - startMinutes;
                        return `${duration} minutos`;
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="mt-6 pt-4 border-t border-gray-600/30">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Total de bloques: {mockJornadas[0].Horarios.length}</span>
                <span>
                  Duración: {mockJornadas[0].Horarios[0]?.inicio} - {mockJornadas[0].Horarios[mockJornadas[0].Horarios.length - 1]?.fin}
                </span>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
}