// import { useState } from "react"

// type NewWorkout = {
//     title: string;
//     load: number;
//     reps: number;
// };

// type Workout = NewWorkout & {
//     _id: string;
//     createdAt: string;
// };

// const WorkoutForm: React.FC = () => {
//     const [title, setTitle] = useState<string>('')
//     const [load, setLoad] = useState<number>(0)
//     const [reps, setReps] = useState<number>(0)
// 	const [error, setError] = useState<boolean | null>(null)
    
// 	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
// 		e.preventDefault()
// 		const workout = {title, load, reps}
// 		const response = await fetch('http://localhost:4000/api/workouts', {
// 			method: 'POST',
// 			body: JSON.stringify(workout),
// 			headers: {
// 				'Content-Type': 'application/json',
// 			}
// 		})
// 		const json = await response.json()
//         if(!response.ok){
// 			setError(json.error)
// 		}
// 		if(response.ok){
//             addWorkout(json as Workout);
// 			setTitle('')
// 			setLoad(0)
// 			setReps(0)
// 			setError(null)
// 			console.log('new workout added')
// 		}
// 	}

//     return (
//         <form 
// 		    className='pt-20 pl-6 w-full flex justify-between flex-col gap-6'
// 			onSubmit={handleSubmit}>
//           <h3>Add a New Workout</h3>
//           <label>Exercise Title: </label>
//           <input
//             className='w-[35px]'
//           	type="text"
//           	onChange={(e)=> setTitle(e.target.value)}
// 			value={title}
// 	    	/>
//           <label>Load in kg: </label>
//           <input 
// 			className='w-[35px]'
//           	type="number"
//           	onChange={(e)=> setLoad(parseInt(e.target.value,10))}
// 			value={load}
// 			/>

//           <label>Reps: </label>
//           <input 
// 			className='w-[35px]'
//           	type="number"
//           	onChange={(e)=> setReps(parseInt(e.target.value,10))}
// 			value={reps}
// 			/>
// 			<button>add workout</button>
// 			{error && <div> {error} </div>}
//         </form>

//     )
// }

// export default WorkoutForm

