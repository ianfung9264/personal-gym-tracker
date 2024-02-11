import { FirebaseError } from 'firebase/app'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const Account = () => {
    
    const navigate = useNavigate();
    const { user, logout } = UserAuth();

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('Logged out')
        } catch (error: unknown) {
            if(error instanceof FirebaseError){
                console.log(error.code, error.message)
            } else {            
                console.log(error)
            }
        }
    }
    
    

  return (
    <div>
        <h1>Account Page</h1>
        <p>Hello! {user && user.email}</p>
        <p>Your firebase uid is {user.uid}</p>
        

        
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
            onClick={handleLogout}>Logout</button>
        
    </div>
  )
}

export default Account