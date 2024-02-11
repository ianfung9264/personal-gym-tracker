const mongoose = require('mongoose')
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    firebaseUID: {
        type:String,
        required:true
    },
    type: {
        type: String,
        required: true,
        enum:['push', 'pull', 'legs']
    },

    title: {
        type: String,
        required: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: Number,
        required: true
    },
    load: {
        type: Number,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('workout', workoutSchema)