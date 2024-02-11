import { BrowserRouter, Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
import Signin from "./pages/Signin" 
import Signup from "./pages/Signup"
import Account from "./pages/Account"
import { AuthContextProvider } from "./context/AuthContext"
import Exercise from "./pages/Exercise"
import ExerciseComponent from "./pages/ExerciseComponent"

function App() {

  return (
    <AuthContextProvider>
        <div className='text-[#aabeb5] app flex flex-col items-center w-full h-full'>
            <BrowserRouter>
                <div className='w-full h-full'>
                    <Routes>
                        <Route path='/' element={<Signin />} />
                        <Route path='/signup' element={<Signup />} />
                        <Route path='/account' element={<Account />} />
                        <Route path='/exercise' element={<Exercise/>} />
                        <Route path='/exerciseComponent' element={<ExerciseComponent />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </div>
    </AuthContextProvider>
  )
}

export default App


  {/* <Route path='/home' element={<Home /> } />
                    <Route path='/login' element={<Login />} />
                    <Route path='/routine' element={<AuthRoute> <Routine /> </AuthRoute>} /> */}