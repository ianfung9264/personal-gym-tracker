// import { FormEvent, useEffect, useState } from 'react'
// import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
// import { Workout } from '../type/type'
// type Props = {}


// interface UserData {
//     _id: string;
//     firebaseUID: string;
//     workouts: Workout[];
//     __v: number;
//   }

// const Routine = (props: Props) => {
//     const auth = getAuth();
//     const [firebaseUID, setFirebaseUID] = useState<string | null>(null)
//     const [title,setTitle] = useState<string>('')
//     const [reps,setReps] = useState<number>(0)
//     const [load,setLoad] = useState<number>(0)
//     const [workouts, setWorkouts] = useState<Workout[]>([]);
    
//     useEffect(()=>{
//         const unsubscribe = onAuthStateChanged(auth,(user)=>{
//             if(user){
//                 setFirebaseUID(user.uid);
//             } else {
//                 setFirebaseUID(null);
//             }
//         })
        
//         return() => unsubscribe();

//     },[auth])


//     useEffect(() => {
//         const fetchWorkouts = async () => {
//           try {
//             const response = await fetch('https://personal-gym-tracker-backend.onrender.com/api/workouts?firebaseUID=${firebaseUID}');
//             if (!response.ok) {
//               throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data: UserData[] = await response.json();
//             // Filter the workouts for the firebaseUID you have
//             const userWorkouts = data.find(user => user.firebaseUID === firebaseUID)?.workouts || [];
//             setWorkouts(userWorkouts);
//           } catch (error: any) {
//             console.log(error.message);
//           }
//         };
    
//         if (firebaseUID) {
//           fetchWorkouts();
//         }
//       }, [firebaseUID]); // Dependency array, re-fetch if firebaseUID changes
    


//     const handleSubmit = async (e: FormEvent) => {
//         e.preventDefault();
//         if(!firebaseUID){
//             console.log('error user UID is not set')
//             return;
//         }
        
//         const workoutData = {
//             firebaseUID: firebaseUID,
//             title:title,
//             reps:reps,
//             load:load
//         }
//         try {
//             const response = await fetch('https://personal-gym-tracker-backend.onrender.com/api/workouts?firebaseUID=${firebaseUID}', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(workoutData)
//             });
//             const result = await response.json();
            
//             if(response.ok){
//                 setTitle('')
//                 setReps(0)
//                 setLoad(0)
//                 setWorkouts([...workouts, result])
//                 console.log('workout successfully added', result)
//             } else {
//                 console.error('Error adding workout:', result)
//             }
//         } catch (error) {
//             console.error('Network Error', error);
//         }
//     }

//   return (
//     <div>Routine page
//         {firebaseUID && <p>your user Uid is {firebaseUID}</p>}
//         <button onClick={()=> signOut(auth)}> Sign Out </button>

//         <div className='border border-black w-3/5 h-3/5'>
//             <form onSubmit={handleSubmit}>
//                 <label htmlFor='title'> Title: </label>
//                 <input 
//                     type='text'
//                     onChange={(e)=> setTitle(e.target.value)}
//                     value={title}
//                 >
//                 </input>
//                 <label htmlFor='reps'> Reps: </label>
//                 <input
//                     type="number"
//                     onChange={(e)=> setReps(Number(e.target.value))}
//                     value={reps}
//                 >
//                 </input>
//                 <label htmlFor='load'> Load: </label>
//                 <input
//                     type="number"
//                     onChange={(e)=> setLoad(Number(e.target.value))}
//                     value={load}
//                 >
//                 </input>
//                 <button 
//                     type='submit' 
//                     className='bg-pink-300 text-white font-bold py-2 px-4 rounded 
//                     hover:bg-blue-700 focus:outline-none focus:shadow-outline'
//                 >
//                     submit
//                 </button> 
//             </form>
//         </div>

//         <div className='border border-black w-3/5 h-3/5'>
//         {
//             workouts.map(workout => (
//                 <div key={workout._id}>
//                     <p>Title:{workout.title}</p>
//                     <p>Reps: {workout.reps}</p>
//                     <p>Load: {workout.load}</p>
//                 </div>
//             )
//             )
//         }
//         </div>

//     </div>
//   )
// }

// export default Routine