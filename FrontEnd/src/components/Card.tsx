import { useEffect, useState } from "react"

interface ScheduleBlock {
    id_bloque: number;
    nombre_blo: string;
    hora_inicio: string;
    hora_final: string;
    nombre_horario: string;
}

export function Card() {
    const [error, setError] = useState("");
    const [schedule, setSchedule] = useState<ScheduleBlock[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSchedule, setSelectedSchedule] = useState("Normal");
    const [currentTime, setCurrentTime] = useState("");

    const fetchSchedule = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/schedule");
            const data = await res.json();
            setSchedule(data.scheduleBlocks || []);
        } catch (error) {
            setError("Error en la conexión");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                setLoading(true);
                const res = await fetch("http://localhost:3000/schedule", {
                    method: "GET",
                    credentials: "include"
                });
                
                if (res.ok) {
                    const data = await res.json();
                    console.log("Schedules displayed correctly", data);
                    setSchedule(data.scheduleBlocks || []);
                    setError("");
                } else {
                    console.log("Schedules have an error");
                    setError("Error loading schedules");
                    setSchedule([]);
                }
            } catch (error) {
                console.error("Error en la conexión:", error);
                setError("Error en la conexión");
                setSchedule([]);
            } finally {
                setLoading(false);
            }
        };

        fetchSchedule();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('es-CO', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSchedule = event.target.value;
        setSelectedSchedule(newSchedule);
    };

    const handleSubmitChange = async () => {
        try {
            const res = await fetch("http://localhost:3000/change-schedule", {
                method: "POST", // Usualmente los cambios se hacen con POST o PUT
            });

            if (res.ok) {
                console.log("Horario cambiado exitosamente");
                // Recargamos el horario para que la UI se actualice.
                await fetchSchedule(); 
            } else {
                console.error("Error al cambiar el horario");
            }
        } catch (error) {
            console.error("Error de conexión al cambiar el horario:", error);
        }
    };
    const getCurrentSchedule = () => {
        if (loading) return "--";
        if (error) return "--";
        if (schedule.length === 0) return "F"; // 'F' para Fin de jornada
        
        const currentBlock = schedule[0];
        // Reemplazamos "bloque " (con espacio) por una cadena vacía para mostrar solo el número.
        return currentBlock.nombre_blo.replace(/bloque /i, '');
    };

    const getShift = () => {
        if (loading || schedule.length === 0) return "Cargando...";
        if (error) return "Error";
    
        const scheduleName = schedule[0]?.nombre_horario.toLowerCase();
        if (!scheduleName) return "Indefinida";
    
        if (scheduleName.includes('mañana')) {
            return scheduleName.includes("especial") ? "Mañana Especial" : "Mañana Normal";
        }
        if (scheduleName.includes('tarde')) {
            return scheduleName.includes("especial") ? "Tarde Especial" : "Tarde Normal";
        }
        return "Indefinida"; // Si no es ni mañana ni tarde
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4 h-auto min-h-[400px] w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[30%] max-w-[500px] bg-transparent rounded-lg border-2 border-red-500 p-8">
            <div className="w-full text-center flex items-center justify-center flex-col gap-1">
                <h2 className="text-red-500 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-2xl">APEX</h2>
                <h3 className="text-red-500 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">TimeAC</h3>
            </div>

            {loading || error ? (
                <div className="w-full flex justify-center items-center h-[56px]">
                    <hr className="border-4 sm:border-5 md:border-6 lg:border-7 border-red-500 w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px]" />
                    <div className="w-3 sm:w-4 md:w-5 lg:w-6"></div>
                    <hr className="border-4 sm:border-5 md:border-6 lg:border-7 border-red-500 w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px]" />
                </div>
            ) : (
                <div className="flex w-full items-center justify-center h-[56px] px-2">
                    <p className="text-red-500 font-extrabold text-center text-5xl sm:text-6xl md:text-7xl lg:text-8xl px-2">
                        {getCurrentSchedule()}
                    </p>
                </div>
            )}

            <div className="w-full text-center">
                <p className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl">
                    {currentTime || "Cargando hora..."}
                </p>
                <p className="text-red-500 text-sm sm:text-base md:text-lg">
                    Jornada: <span className="font-bold">{getShift()}</span>
                </p>
            </div>
            <div className="w-full flex justify-center items-center flex-col px-2">
                <p className="font-extrabold text-white text-center text-sm sm:text-base md:text-lg lg:text-[20px]">Cambiar Horario Manualmente</p>
                <p className="text-white text-center text-xs sm:text-sm md:text-base">(Solo coordinadora)</p>
                <select name="Horario" value={selectedSchedule} onChange={handleSelectChange} className="bg-black border-1 border-red-500 w-[110px] sm:w-[120px] md:w-[130px] p-1.5 sm:p-2 text-white font-extrabold focus:outline-none text-sm sm:text-base md:text-lg lg:text-[20px] rounded-lg cursor-pointer">
                    <option value="Normal">Normal</option>
                    <option value="Especial">Especial</option>
                </select>
                <button onClick={handleSubmitChange} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-red-700 transition-colors text-sm sm:text-base">Cambiar Horario</button>
            </div>
        </div>
    )
}