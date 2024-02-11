// const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const Workout = require('../models/user')

//create user
const createUser = async (req, res)=> {
    const { firebaseUID } = req.body;
    try {
        //check if user already exist
        const existingUser = await User.findOne({ firebaseUID });
        if(existingUser){
            return res.status(409).json({error: 'User already exist'})
        }
        const newUser = new User ({ firebaseUID, workouts:[] });
        await newUser.save();
        res.status(201).json(newUser);

    } catch (error) {
        res.status(400).json({error:error.message})
    }
}


// create new workout
const createWorkout = async (req,res) => {

    const { firebaseUID, type, title, load, sets, reps} = req.body

    try {
       const newWorkout = new Workout ({
        firebaseUID,
        type,
        title,
        load,
        sets,
        reps
       })

       await newWorkout.save();
       res.status(201).json(newWorkout)

    } catch (error) {
        res.status(400).json({error: error.message})
    }

}



// Modify this function to accept a query parameter
const getWorkouts = async (req, res) => {
    const firebaseUID = req.query.firebaseUID; // Access the firebaseUID provided as a query parameter

    try {
        let workouts;
        if (firebaseUID) {
            // Find workouts for a specific user
            workouts = await Workout.find({ firebaseUID: firebaseUID });
        } else {
            // Find all workouts if no specific user is queried
            workouts = await Workout.find({});
        }
        res.status(200).json(workouts);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// //GET all workouts

// const getWorkouts = async (req,res) => {
//     try {
//         const workouts = await Workout.find()
//         res.status(200).json(workouts)
//     } catch (error) {
//         res.status(404).json({error: error.message})
//     }
// }

//GET a USER's workouts

const fetchWorkoutsByFirebaseUID = async (firebaseUID) => {
    try {
        const workouts = await Workout.find({ firebaseUID: firebaseUID });
        return workouts;
    } catch (error) {
        console.error('Error fetching workouts:', error);
        throw error; // Rethrow the error to be handled by the calling function
    }
};

const fetchById = async (req, res) => {
        try {
            const firebaseUID = req.params.firebaseUID;
            const workouts = await fetchWorkoutsByFirebaseUID(firebaseUID);
    
            if (workouts.length === 0) {
                return res.status(404).json({ message: 'No workouts found for the provided Firebase UID.' });
            }
    
            res.status(200).json(workouts);
        } catch (error) {
            res.status(500).json({ error: 'An error occurred while trying to fetch workouts.' });
        }
}



// delete a workout
    const deleteWorkout = async (req,res) => {
        
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "no such workout (not valid mongo object Id)"})
        }

        const workout = await Workout.findOneAndDelete({_id:id})//find the document that has an _id that is the same as the id = req.params
        
        if(!workout){
            return res.status(400).json({error: "no such workout"})
        }
        res.status(200).json({workout})
    }


module.exports = {
    deleteWorkout,
    createWorkout,
    createUser,
    getWorkouts
}