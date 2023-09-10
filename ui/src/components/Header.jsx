import { Link } from "react-router-dom";

function Header() {
  const condition = true;
  
  const handleSignOut = async () => {
    console.log("Hello ");
  }


  return (
    <div className="h-[10vh] w-[100vw] flex flex-row justify-around items-center border-b-2 border-black bg-teal-300">
        <span className="text-[35px] text-violet-800 font-bold">FireChat</span>
        <div className="flex flex-row-reverse gap-x-4 justify-start sm:pr-0 pr-4 sm:justify-evenly items-center w-1/2 sm:w-1/4">
        
          <div className="flex flex-col">
            <span className="font-bold">{
            //   "user.email" != "" 
              condition
              ? 
              <div className="sm:flex-row flex flex-row items-baseline sm:gap-2 cursor-pointer" onClick={handleSignOut}>
                <span className="hidden sm:block">Sign out</span>
                <i className="fas fa-sign-out-alt text-[12.5px]" ></i>
              </div>
              : 
              <Link to = '/login'>
                <div className="sm:flex-row flex flex-row items-baseline sm:gap-2 cursor-pointer">
                  <span className="hidden sm:block">Sign in</span>
                  <i className="fas fa-sign-in-alt text-[12.5px]" ></i>
                </div>
              </Link>
            }</span>
          </div>
        
      </div>
    </div>
  )
}

export default Header