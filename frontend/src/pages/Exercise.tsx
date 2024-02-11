import React, { FormEvent, useEffect } from 'react'
import { UserAuth } from '../context/AuthContext';
import WorkoutDetails from '../components/WorkoutDetails';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
type Workouttype = 'push' | 'pull' | 'legs' ;
type Workout = {
  _id: string;
  title: string;
  type: string;
  load: number;
  sets: number;
  reps: number;  
};


const Exercise = () => {
    const { user } = UserAuth();
    const [type, setType] = React.useState<Workouttype>('push')
    const [title, setTitle] = React.useState<string>('')
    const [load, setLoad] = React.useState<number>(0)
    const [reps, setReps] = React.useState<number>(0)
    const [sets, setSets] = React.useState<number>(0)
    const [error, setError] = React.useState<string | null>(null)
    const [firebaseUID, setFirebaseUID] = React.useState('');
    const [workouts, setWorkouts] = React.useState<Workout[]>([]);
    const [isMenuToggled, setIsMenuToggled] = React.useState<boolean>(false);

    const fetchWorkouts = async () => {
        // Set the firebaseUID state with the user's UID
      if (firebaseUID) { // Check if firebaseUID is set
        try {
          const response = await fetch(`http://localhost:4000/api/workouts?firebaseUID=${firebaseUID}`); // Replace PORT with your actual port number
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setWorkouts(data); // Set the workouts state with the fetched data
        } catch (error) {
          console.error("Error fetching data: ", error);
          // Handle errors here
        }
      }
    };

    useEffect(() => {
        setFirebaseUID(user.uid); 
      }, [user]); 

    useEffect(() => {
    fetchWorkouts(); // Call the fetch function
  }, [firebaseUID]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
    
        const workoutData = {
            firebaseUID: user.uid,
            type: type,
            title: title,
            sets: sets,
            reps: reps,
            load: load
        }

        try {
            const response = await fetch(`http://localhost:4000/api/workouts/`,{
                method:'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify(workoutData)
            });
            
            const result = await response.json();

            if(response.ok) {
                setType('push');
                setTitle('');
                setLoad(0);
                setSets(0);
                setReps(0);
                console.log('workout successfully added', result)
                fetchWorkouts();
            } else {
                console.error('Error adding workout:', result)
            }
        } catch (error) {
            console.error('Network Error', error);
        } 
    }

    return (
        <div className='relative flex flex-col'>
            <div className='flex justify-end items-start p-4'>
                    
                    <button className='relative' onClick={()=> setIsMenuToggled(!isMenuToggled)}>
                        <Bars3Icon className='h-10 w-10 text-white' />
                    </button>
            </div>
        
            {isMenuToggled && (
            <div className='fixed right-0 top-0 z-[40] h-full w-2/5 pt-16 bg-gray-20 text-black'>
                <button className='absolute right-0 top-0 p-4' onClick={() => setIsMenuToggled(!isMenuToggled)}> 
                    <Bars3Icon className='h-10 w-10 text-black'/>
                </button>
                <form 
                className='border flex flex-col gap-6 p-6'
                onSubmit={handleSubmit}>
                    <h3 className='text-2xl font-bold'>Add a New Workout</h3>
                    <label>Type: </label>
                    <select
                        className='border-2 border-blue-300'
                        onChange={(e)=> setType(e.target.value as Workouttype)}
                        value={type}
                        >
                        <option value="push">Push</option>
                        <option value="pull">Pull</option>
                        <option value="legs">Legs</option>
                    </select>
                    <label>Exercise Title: </label>
                    <input
                        className='border-2 border-blue-300'
                        type="text"
                        onChange={(e)=> setTitle(e.target.value)}
                        value={title}
                        />
                    <label>Load in kg: </label>
                    <input 
                        className='border-2 border-blue-300'
                        type="number"
                        onChange={(e)=> setLoad(parseInt(e.target.value,10))}
                        value={load}
                        />

                    <label>Sets: </label>
                    <input 
                        className='border-2 border-blue-300'
                        type="number"
                        onChange={(e)=> setSets(parseInt(e.target.value,10))}
                        value={sets}
                        />
                    <label>Reps: </label>
                    <input 
                        className='border-2 border-blue-300'
                        type="number"
                        onChange={(e)=> setReps(parseInt(e.target.value,10))}
                        value={reps}
                        />
                    <button>add workout</button>
                        {error && <div> {error} </div>}
                    </form> 
            </div>
            )}
            <h1 className='font-bold text-5xl ml-10 mr-10 mt-10'> Select Your Exercise Type </h1>
            <h2 className='font-bold text-3xl ml-20 mt-10 mr-20  rounded-xl text-center bg-gray-20 border-2 border-white text-[#2D3730]'>       
                <Link to="/exerciseComponent" state={{ typeOfExerciseToShow: "push" }} >
                    Push Type 
                </Link>
            </h2>
            <div className='p-4'>
                {workouts.map(workout => (
                    <div key={workout._id}>
                        <WorkoutDetails workout={workout} typeOfExerciseToShow='push'/>
                    </div>
                ))}
            </div>
            
            <h2 className='font-bold text-3xl ml-20 mr-20 rounded-xl text-center  bg-gray-20 border-2 border-white text-[#2D3730]'>
                <Link to='/exerciseComponent' state={{ typeOfExerciseToShow: 'pull' }}>
                    Pull Type
                </Link>
            </h2>

            
            
            <div className='p-4'>
                {workouts.map(workout => (
                    <div key={workout._id}>
                        <WorkoutDetails workout={workout} typeOfExerciseToShow='pull'/>
                    </div>
                ))}
            </div>

            <h2 className='font-bold text-3xl ml-20 mr-20 rounded-xl text-center  bg-gray-20 border-2 border-white text-[#2D3730]'>
                <Link to='/exerciseComponent' state={{ typeOfExerciseToShow: 'legs' }}>
                    Leg Type
                </Link>
            </h2>

            <div className='p-4'>
                {workouts.map(workout => (
                    <div key={workout._id}>
                        <WorkoutDetails workout={workout} typeOfExerciseToShow='legs'/>
                    </div>
                ))}
            </div>



            {/* <div className='px-4 py-4'>
                <Link to='/exerciseComponent'>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 
                        rounded-full focus:outline-none focus:shadow-outline transform active:scale-95 transition duration-150 ease-in-out">Start
                    </button>
                </Link>
            </div> */}
        </div>
  )
}

export default Exercise
