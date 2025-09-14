export function Card() {
    return (
        <div className="flex flex-col items-center h-auto min-h-[400px] w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[30%] max-w-[500px]bg-transparent rounded-lg border-2 border-red-500 p-4 sm:p-6 md:p-8 lg:p-10 mx-auto">
            <div className="w-full text-center flex items-center justify-center flex-col 
                mt-4 sm:mt-6 md:mt-8 lg:mt-12 
                mb-4 sm:mb-6 md:mb-8 lg:mb-12">
                <h2 className="text-red-500 font-extrabold 
                    text-lg sm:text-xl md:text-2xl lg:text-2xl 
                    mb-1 sm:mb-2">APEX</h2>
                <h3 className="text-red-500 font-extrabold 
                    text-2xl sm:text-3xl md:text-4xl lg:text-5xl">TimeAC</h3>
            </div>

            <div className="w-full flex justify-center items-center 
                mb-3 sm:mb-4 
                mt-2 sm:mt-3">
                <hr className="border-4 sm:border-5 md:border-6 lg:border-7 
                    border-red-500 
                    w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px] 
                    mr-3 sm:mr-4 md:mr-5 lg:mr-6" />
                <hr className="border-4 sm:border-5 md:border-6 lg:border-7 
                    border-red-500 
                    w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px]" />
            </div>

            <div className="flex w-full items-center justify-center 
                mt-2 sm:mt-3 md:mt-4 
                mb-2 sm:mb-3 md:mb-4">
                <p className="text-red-500 font-extrabold text-center 
                    text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                    px-2">Horario 25:12:12</p>
            </div>

            <div className="w-full flex justify-center items-center flex-col 
                mt-2 sm:mt-3 
                mb-2 sm:mb-3 
                px-2">
                <p className="font-extrabold text-white text-center 
                    text-sm sm:text-base md:text-lg lg:text-[20px] 
                    mb-1">Cambiar Horario Manualmente</p>
                <p className="text-white text-center 
                    text-xs sm:text-sm md:text-base 
                    mb-3 sm:mb-4 md:mb-5">(Solo coordinadora)</p>
                <select name="Horario" className="
                    bg-black border-1 border-red-500 
                    w-[110px] sm:w-[120px] md:w-[130px] 
                    p-1.5 sm:p-2 
                    text-white font-extrabold focus:outline-none 
                    text-sm sm:text-base md:text-lg lg:text-[20px] 
                    rounded-lg
                    cursor-pointer
                ">
                    <option value="Normal">Normal</option>
                    <option value="Especial">Especial</option>
                </select>
            </div>
        </div>
    )
}