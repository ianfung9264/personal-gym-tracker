import React, { useEffect, useState } from 'react';
import Timer from '../components/Timer';
import { UserAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { motion } from "framer-motion"
type Workout = {
  _id: string;
  title: string;
  type: string;
  load: number;
  reps: number;  
};

type ExerciseComponentProps = {
    typeOfExerciseToShow: 'push' | 'pull' 
}

const ExerciseComponent: React.FC<ExerciseComponentProps> = ({  }) => {

    let { state } = useLocation();
    const [isVisible, setIsVisible] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timer, setTimer] = useState(0);
    const { user } = UserAuth();
    const [firebaseUID, setFirebaseUID] = useState('');
    const [workouts, setWorkouts] = useState<Workout[]>([]);    
    const [index, setIndex] = useState<number>(0);
    const [setCompleted, setSetCompleted] = useState<number>(0);
 
    useEffect(() => {
        setFirebaseUID(user.uid); 
    }, [user]); 

    const fetchWorkouts = async () => {
        // Set the firebaseUID state with the user's UID
        if (firebaseUID) { // Check if firebaseUID is set
            try {
            const response = await fetch(`http://localhost:4000/api/workouts?firebaseUID=${firebaseUID}`); // Replace PORT with your actual port number
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const filteredWorkouts = data.filter((workouts: Workout) => workouts.type === state.typeOfExerciseToShow);
            setWorkouts(filteredWorkouts); // Set the workouts state with the fetched data
            } catch (error) {
                console.error("Error fetching data: ", error);
            // Handle errors here
            }
        }
    };

    useEffect(() => {
    fetchWorkouts(); // Call the fetch function
    }, [firebaseUID]);

 
  useEffect(() => {
    setIsVisible(true);  
    const timeoutID = setTimeout(()=> setIsVisible(false), 10000)
    return () => clearTimeout(timeoutID);
  }, [setCompleted]); // Depend on setNumber, so it runs every time setNumber changes
  
  const handleNextSet = () => {
    setSetCompleted(prev => prev + 1);
    console.log(setCompleted)
  };

  const handleNextExercise = () => {
    setIndex(prev => prev + 1);
    setSetCompleted(0);
    console.log(index)
    if(index === workouts.length - 1) {
        setIsCompleted(true);
    }
  };

  
  return (
    <div className='h-full'>
        <h1 className='font-thin p-4 text-3xl'>Your current exercise is: </h1>
        {workouts.length > 0  && workouts[index] ? (
            <div className='flex flex-col font-montserrat'>
                <h2 className='relative flex flex-col items-center justify-center min-h-[450px] text-6xl text-center font-bold'>{workouts[index].title} 
                    <div className='absolute top-80 text-2xl font-thin'> for {workouts[index].reps} reps </div> 
                </h2>                
                <motion.div
                     initial='hidden'
                     animate={isVisible ? 'visible' : 'hidden'}
                     transition={{ duration: 1}}
                     variants={{ 
                         hidden: { opacity:0, x:-50 },
                         visible: { opacity:1, x:0 }
                     }}
                >
                    <h2 className='p-4 font-montserrat text-2xl'> 
                        You are on set #{setCompleted + 1}
                    </h2>
                </motion.div>
            </div>
        ) : ''}
      
        <div className='pt-20'>
          <Timer onTimerComplete={handleNextExercise} onSetComplete={handleNextSet} isCompleted = {isCompleted} />
        </div>
    </div>
  );
};

export default ExerciseComponent;
