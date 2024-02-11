// import { getAuth, GoogleAuthProvider,signInWithPopup } from 'firebase/auth'
// import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';


// const Login = () => {
//     const auth = getAuth();
//     const navigate = useNavigate();

//     const [authing, setAuthing] = useState<boolean>(false)
//     const [userName, setUserName] = useState<string>('')
//     const [password, setPassword] = useState<string>('')
    
//     const signInWithGoggle = async () => {
//         setAuthing(true);

//         signInWithPopup(auth, new GoogleAuthProvider())
//         .then(async (response) => {
//             // After successful sign-in, check if the user exists in the backend
//             const firebaseUID = response.user.uid;
//             try {
//                 // Call the API service to create the user if not exists
//                 await createUser(firebaseUID);
//             } catch (error) {
//                 console.error("User creation or check failed", error);
//             }
//         })
//         .catch(error => {
//             console.error(error);
//             setAuthing(false);
//         })
//         .finally(() => {
//             setAuthing(false);
//             navigate('/routine');
//         });
//     }
    

//   return (
//     <div className='flex justify-center items-center w-full h-full'>
//         <div className='flex flex-col items-center gap-14 py-6 border-4 border-black w-3/5 h-2/5 drop-shadow '>
//            <form>
//             <label htmlFor='username'> UserName: </label>
//             <input 
//                 type='text'
//                 onChange={(e)=> setUserName(e.target.value)}
//                 value={userName}
//             >
//             </input>
//             <label htmlFor='password'> Password: </label>
//             <input
//                 type="password"
//                 onChange={(e)=> setPassword(e.target.value)}
//                 value={password}
//             >
//             </input>

//             <button 
//                 className='bg-pink-300 text-white font-bold py-2 px-4 rounded 
//                 hover:bg-blue-700 focus:outline-none focus:shadow-outline'
//                 onClick={()=>signInWithGoggle()} disabled={authing}>
//                 Sign in with Google
//             </button>
            
//             {/* <button 
//                 type='submit' 
//                 className='bg-pink-300 text-white font-bold py-2 px-4 rounded 
//                 hover:bg-blue-700 focus:outline-none focus:shadow-outline'
//             >
//                 submit
//              </button> */}
//            </form>
//         </div>
//     </div>
//   )
// }

// export default Login

