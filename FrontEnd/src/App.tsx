function App() {

  return (
    <div className="bg-black w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 h-auto min-h-[400px] w-[95%] sm:w-[85%] md:w-[70%] lg:w-[50%] xl:w-[30%] max-w-[500px] bg-transparent rounded-lg border-2 border-red-500 p-8">
        <div className="w-full text-center flex items-center justify-center flex-col gap-1">
          <h2 className="text-red-500 font-extrabold text-lg sm:text-xl md:text-2xl lg:text-2xl">APEX</h2>
          <h3 className="text-red-500 font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">TimeAC</h3>
        </div>

 
          <div className="w-full flex justify-center items-center h-[56px]">
            <hr className="border-4 sm:border-5 md:border-6 lg:border-7 border-red-500 w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px]" />
            <div className="w-3 sm:w-4 md:w-5 lg:w-6"></div>
            <hr className="border-4 sm:border-5 md:border-6 lg:border-7 border-red-500 w-[25px] sm:w-[30px] md:w-[35px] lg:w-[40px]" />
          </div>


        <div className="w-full text-center">
          <p className="text-red-500 font-bold text-lg sm:text-xl md:text-2xl">

          </p>
          <p className="text-red-500 text-sm sm:text-base md:text-lg">
            Jornada: <span className="font-bold"> </span>
          </p>
        </div>
        <div className="w-full flex justify-center items-center flex-col px-2">
          <p className="font-extrabold text-white text-center text-sm sm:text-base md:text-lg lg:text-[20px]">Cambiar Horario Manualmente</p>
          <p className="text-white text-center text-xs sm:text-sm md:text-base mb-2">(Solo coordinadora)</p>

          {/* showAdminOptions ? (
            <>
              <select name="Horario" value={selectedSchedule} onChange={handleSelectChange} className="bg-black border-1 border-red-500 w-[110px] sm:w-[120px] md:w-[130px] p-1.5 sm:p-2 text-white font-extrabold focus:outline-none text-sm sm:text-base md:text-lg lg:text-[20px] rounded-lg cursor-pointer">
                <option value="Normal">Normal</option>
                <option value="Especial">Especial</option>
              </select>
              <button onClick={handleSubmitChange} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg mt-4 hover:bg-red-700 transition-colors text-sm sm:text-base">Cambiar Horario</button>
            </>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-black border-1 border-red-500 p-2 text-white focus:outline-none rounded-lg text-center" />
              <button onClick={handlePasswordSubmit} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm sm:text-base">Acceder</button>
            </div>
          )} */}

        </div>
      </div>
    </div>
  )
}

export default App
