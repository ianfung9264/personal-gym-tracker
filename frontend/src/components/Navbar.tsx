import { Link } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
// import WorkoutForm from "./WorkoutForm";

const Navbar = () => {
  const [isMenuToggled, setIsMenuToggled] = useState<boolean>(false);

    return (
     <div className='w-full'>
      <header className='flex items-center justify-between bg-gray-200 drop-shadow w-full'>
        <div className='flex items-center justify-between w-full bg-gray-200 drop-shadow'>
          <Link to='/' ><h1 className='font-bold py-6 pl-6'>Workout Buddy</h1></Link>
          <Link to='/home'> <h1>Home Page</h1></Link>
          <Link to='/routine' ><h1>Routine Page</h1></Link>
          <Link to='/login' ><h1>Login Page</h1></Link>

          <button className='pr-6' onClick={() => setIsMenuToggled(!isMenuToggled)}>
            <Bars3Icon className='h-5 w-5 text-black' />
          </button>
        </div>
      </header>
      {isMenuToggled && (
        <div className='fixed right-0 bottom-0 z-[40] h-full w-[150px] bg-primary-300'>
            <button className='absolute right-0 pr-6 pt-6'
            onClick={()=> setIsMenuToggled(!isMenuToggled)}> <XMarkIcon className='h-5 w-5 text-black'/> </button>
            {/* <WorkoutForm />  */}
        </div>
      )}
     </div>
    );
  
};

//   return (
//     <div className='fixed right-0 bottom-0 z-40 h-full w-[150px] bg-primary-300'>
//         Pop Up Menu
//     </div>
//   )

export default Navbar;
