function Body() {
  return (
    <div className="h-[90vh] w-[96vw] flex-col justify-center items-center bg-sky-100">
        <div className="flex flex-row justify-center items-baseline w-[96vw] gap-[3vh]">
            <p className="text-2xl text-purple-600 font-bold">
                Welcome to the most 
            </p>
            <p className="text-7xl text-purple-600 font-extrabold">
                PRIVATE
            </p>
            <p className="text-2xl text-purple-600 font-bold">
                chat app in the world!
            </p>
        </div>
        <div className="flex flex-col justify-center items-center w-[96vw] gap-[3vh]">
            <span className="text-7xl text-violet-800 font-extrabold">
                PRIVACY
            </span>
            <span className="text-7xl text-violet-800 font-extrabold">
                {`at it's`}
            </span>
            <span className="text-7xl text-violet-800 font-extrabold">
                PEAK
            </span>
        </div>
    </div>
  )
}

export default Body