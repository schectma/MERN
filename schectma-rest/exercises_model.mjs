import mongoose from 'mongoose';
import 'dotenv/config';

let connection = undefined;

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: { type: String, required: true },
    date: { type: String, required: true }
});

const Exercise = mongoose.model('Exercise', userSchema);

// This function connects to the MongoDB server.
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

// 1. Create new exercise object
// async function createExercise(data) {
//     const exercise = new Exercise(data);
//     return await exercise.save();
// }

async function createExercise(name, reps, weight, unit, date) {
    const exercise = new Exercise(name, reps, weight, unit, date);
    // Exercise.push(exercise)
    console.log("createExercise");
    return await exercise.save();
}

// 2. Retrieve all exercises.
async function getExercises() {
    return await Exercise.find({});
}

/**
 * 3. Retrieve exercises based on the ID
 * @param {Object} exercise_id
 * @returns 
 */
// const findExerciseById = (exercise_id) => {
//     const result = Exercise.filter( (exercise) => exercise_id === exercise._id)
//     return result.length === 0 ? null : result[0];
// }

// 3. Retrieve exercise by ID
async function getExerciseById(id) {
    return await Exercise.findById(id);
}

/**
 * Replace the name, reps, weight properties of the exercise with the id value provided
 * @param {String} _id 
 * @param {String} name
 * @param {Number} reps
 * @param {Number} weight 
 * @param {String} unit
 * @param {String} date
 * @returns Number of documents modified
 */
async function updateExercise(id, data) {
    const result = await Exercise.updateOne({ _id: id }, data);
    return result;
}


/**
 * Delete the exercise with provided id value
 * @param {String} _id 
 * @returns Count of deleted documents
 */
async function deleteExerciseById(id) {
    const result = await Exercise.findByIdAndDelete(id);
    return result !== null;
}

export { connect, createExercise, getExercises, getExerciseById, updateExercise, deleteExerciseById };
