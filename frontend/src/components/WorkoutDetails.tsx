import { TrashIcon } from "@heroicons/react/24/outline"



type WorkoutProps = {
    workout: {
    title: string;
    type: string;
    load: number;
    sets: number;
    reps: number;
    _id: string;
    },

    typeOfExerciseToShow: 'push' | 'pull' | 'legs';
}


const WorkoutDetails: React.FC<WorkoutProps> = ({ workout, typeOfExerciseToShow }) => {
    const handleClick = async () => {

        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: "DELETE"
        })

        if(response.ok){
            console.log("deleted")
            window.location.reload()
        }        
    }


    if(workout.type !== typeOfExerciseToShow)return null;

    return (
        <div key={workout._id} className='flex flex-row gap-6 item-center py-4'>
            <div className=' text-xl text-[#D4FFDE] w-48'>{workout.title}</div>
            <div className='w-32 text-xl'>Weight<br /> {workout.load} kg</div>
            <div className='w-24 text-xl'>Sets <br />{workout.sets}</div>
            <div className='w-24 text-xl'>Rep <br />{workout.reps}</div>
            
            <span onClick={handleClick}><TrashIcon className='w-8 h-8 pt-2'/></span>
        </div>
    )
}

export default WorkoutDetails


// "primary-100": "#FFE1E0",
// "primary-300": "#FFA6A3",
// "primary-500": "#FF6B66",
// "secondary-400": "#FFCD5B",