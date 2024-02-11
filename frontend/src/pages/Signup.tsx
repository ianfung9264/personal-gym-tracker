import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { FirebaseError } from 'firebase/app'

const Signup = () => {

    const [email, setEmail] = useState<string | null>(null)
    const [password, setPassword] = useState<string | null>(null)
    const [error, setError] = useState<string | null>(null)
    const { createUser } = UserAuth();
    const navigate = useNavigate();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email, password);
            navigate('/account');
        } catch (error: unknown) {
            if(error instanceof FirebaseError){
                setError(error.message);
                console.log(error.code, error.message)
            } else {
                setError('An unexpected Error occured')
                console.log(error)
            }
        }
    };
    
    return (
        <div className='max-w-[700px] mx-auto my-16 p-4'>
            <h1 className='text-2xl font-bold mb-4'> Sign up for a free account </h1>            
            <p className='py-2'> Already have an account? {" "} <Link className='text-blue-500 underline' to='/'> Sign in </Link> </p>
            {/* NEED TO MAKE SIGNUP IN LINK*/}
            <form onSubmit={handleSubmit}>
                <div>
                    <label className='block py-2' htmlFor='email'>Email:</label>
                    <input type='email' id='email' className='w-full border border-gray-400 p-2' onChange={(e)=> setEmail(e.target.value)} />
                </div>
                <div>
                    <label className='block py-2' htmlFor='password'>Password:</label>
                    <input type='password' id='password' className='w-full border border-gray-400 p-2' onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <button className='bg-blue-500 hover:bg-blue-700 rounded text-white font-bold mt-4 py-2 px-4'>Sign up</button>
            </form>
         </div>
  )
}

export default Signup