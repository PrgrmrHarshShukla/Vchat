import '@fortawesome/fontawesome-free/css/all.css'


import chatImage from './image.png'

function Body() {


  return (
    <div className="min-h-[90vh] h-auto w-[96vw] flex sm:flex-row flex-col gap-[10vh] sm:gap-0 justify-center items-center bg-sky-100">
        <div className="flex flex-col justify-center items-center sm:w-[48vw] gap-[12vh] sm:gap-[20vh] min-h-[90vh] sm:min-h-[90vh]">
            <div className="flex flex-col justify-center items-center sm:w-[48vw] gap-[2vh]">
                <p className=" text-lg sm:text-2xl text-gray-600 font-bold">
                    Welcome to the most 
                </p>
                <p className="text-4xl sm:text-7xl text-violet-800 font-extrabold">
                    PRIVATE
                </p>
                <p className=" text-lg sm:text-2xl text-gray-600 font-bold">
                    chat app in the world!
                </p>
            </div>
            <div className="flex flex-col justify-center items-center sm:w-[48vw] gap-[3vh]">
                <span className=" text-lg sm:text-2xl text-gray-600 font-bold -mb-[3vh]">
                    What lies at our core?
                </span>
                <hr className="border-[1px] border-black sm:w-[48vw] w-[96vw]" />
                <ul className="text-lg sm:text-4xl font-extrabold sm:ml-[9vw]  text-violet-900">
                    <li>• USER PRIVACY</li>
                    <li>• USER SECURITY</li>
                    <li>• USER CONVENIENCE</li>
                    
                </ul>
            </div>
        </div>
        <div className="flex flex-col justify-center items-center w-[90vw] sm:w-[48vw] gap-[3vh]  min-h-[100vh] sm:min-h-[90vh]">
            <img src={chatImage} className="h-[80vh]" />
            <div className="sm:hidden border-t-[2px] w-[96vw] border-black flex flex-col justify-center items-center">
                <div className="mt-[3vh]">
                    Made with 💖 by  {` `}
                    <a href="https://github.com/PrgrmrHarshShukla">
                        <u>
                            Harsh Shukla
                        </u>
                    </a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Body