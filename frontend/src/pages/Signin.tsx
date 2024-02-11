import { FirebaseError } from 'firebase/app'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'




const Signin = () => {
    const [email, setEmail] = useState<string | null>('')
    const [password, setPassword] = useState<string | null>('')
    const [error, setError] = useState<string | null>('')
    const navigate = useNavigate();
    const { signIn } = UserAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        try {
            await signIn(email, password);
            navigate('/exercise')
        } catch (error: unknown) {
            if(error instanceof FirebaseError){
                setError(error.message);
                console.log(error.code, error.message)
            } else {
                setError('An unexpected Error occured')
                console.log(error)
            }
        }
        
    }

  return (
    <motion.div 
    className='max-w-[700px] mx-auto my-16 p-4'
    initial='hidden'
    whileInView="visible"
    viewport={{ once:true, amount: 0.5 }}
    transition={{ duration: 1}}
    variants={{ 
        hidden: { opacity:0, x:-50 },
        visible: { opacity:1, x:0 }
    }}
     >
        <h1 className='text-3xl pt-20 font-bold mb-4'> Sign in to your account </h1>
        <p> Don't have an account yet? {" "} <Link className='text-blue-500 underline' to='/signup'> Sign up </Link> </p>
        {/* NEED TO MAKE SIGNUP IN LINK*/}
        <form onSubmit={handleSubmit} >
            <div>
                <label className='block pt-6 pb-4' htmlFor='email'>Email</label>
                <input type='email' id='email' className='w-full border border-gray-400 p-2' onChange={(e)=> setEmail(e.target.value)} />
            </div>
            <div className='pb-12 '>
                <label className='block pt-6 pb-4' htmlFor='password'>Password</label>
                <input type='password' id='password' className='w-full border border-gray-400 p-2' onChange={(e)=> setPassword(e.target.value)}/>
            </div>
            <button className='bg-[#788577]  hover:bg-[#736F72] rounded text-white font-bold mt-4 py-2 px-4 w-1/2'>Sign in</button>
        </form>
    </motion.div>
  )
}

export default Signin