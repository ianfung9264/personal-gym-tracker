const express = require('express')
const {
    deleteWorkout,
    createWorkout,
    createUser,
    getWorkouts
} = require('../controllers/workoutController')

const user = require('../models/user')
const router = express.Router()


//POST a new workout to a user
router.post('/', createWorkout)

//GET all workouts
router.get('/', getWorkouts)

//DELETE a workout
router.delete('/:id', deleteWorkout)

module.exports = router