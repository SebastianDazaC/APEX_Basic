import { useEffect, useState } from "react";

function getCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

function getJornada(hora: string) {
    const horaActual = parseInt(hora.split(":")[0]);

    if (horaActual >= 6 && horaActual < 12) {
        return "Mañana";
    } else if (horaActual >= 12 && horaActual < 18) {
        return "Tarde";
    } else {
        return "Fin de Jornada";
    }
}

export function AdminGetTipoJornada() {

    const [currentTime, setCurrentTime] = useState("");
    const [jornada, setJornada] = useState("");
    const [tipoJornada, setTipoJornada] = useState("Normal");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(getCurrentTime());
        }, 1000);

        setJornada(getJornada(currentTime));

        return () => clearInterval(timer);
    }, [currentTime]);
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 dark:from-black dark:via-gray-900 dark:to-black flex items-center justify-center p-4">
            <main className="w-full max-w-md mx-auto">
                {/* Card Container */}
                <div className="bg-gray-800/50 dark:bg-gray-900/80 backdrop-blur-sm border border-red-500/30 dark:border-red-400/40 rounded-2xl p-8 shadow-2xl shadow-red-500/10">

                    {/* Header */}
                    <header className="text-center mb-8">
                        <h1 className="text-red-400 dark:text-red-300 font-black text-xl sm:text-2xl tracking-wider">
                            APEX
                        </h1>
                        <h2 className="text-red-500 dark:text-red-400 font-black text-3xl sm:text-4xl md:text-5xl tracking-wide mt-1">
                            TimeAC
                        </h2>
                    </header>

                    {/* Decorative Divider */}
                    <div className="flex justify-center items-center mb-8">
                        <div className="h-1 w-8 bg-gradient-to-r from-transparent via-red-500 to-red-400 rounded-full"></div>
                        <div className="w-4"></div>
                        <div className="h-1 w-8 bg-gradient-to-l from-transparent via-red-500 to-red-400 rounded-full"></div>
                    </div>

                    {/* Time Display */}
                    <div className="text-center mb-8">
                        <time className="block text-white dark:text-gray-100 font-bold text-3xl sm:text-4xl md:text-5xl font-mono tracking-wider">
                            {currentTime}
                        </time>
                    </div>

                    {/* Jornada Info */}
                    <div className="text-center mb-8">
                        <div className="inline-block bg-red-500/10 dark:bg-red-400/10 border border-red-500/20 dark:border-red-400/20 rounded-lg px-6 py-3">
                            <p className="text-red-400 dark:text-red-300 font-semibold text-sm uppercase tracking-wider mb-1">
                                Jornada
                            </p>
                            <p className="text-red-500 dark:text-red-400 font-bold text-lg">
                                {jornada}
                            </p>
                        </div>
                    </div>

                    {/* Tipo Jornada Selector */}
                    <div className="text-center">
                        <label htmlFor="tipo_jornada" className="block text-gray-300 dark:text-gray-400 font-medium text-sm mb-3">
                            Tipo de Jornada
                        </label>
                        <select
                            id="tipo_jornada"
                            name="tipo_jornada"
                            value={tipoJornada}
                            onChange={(e) => setTipoJornada(e.target.value)}
                            className="w-full max-w-xs mx-auto bg-gray-700/50 dark:bg-gray-800/70 border border-gray-600 dark:border-gray-700 text-white dark:text-gray-100 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 cursor-pointer hover:bg-gray-600/50 dark:hover:bg-gray-700/70"
                        >
                            <option value="Normal" className="bg-gray-800 dark:bg-gray-900">Normal</option>
                            <option value="Especial" className="bg-gray-800 dark:bg-gray-900">Especial</option>
                        </select>
                    </div>

                </div>
            </main>
        </div>
    )
}