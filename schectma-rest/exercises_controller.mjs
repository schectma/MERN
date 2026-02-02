import 'dotenv/config';
import * as exercises from './exercises_model.mjs';
import express from 'express';
import asyncHandler from 'express-async-handler';

const PORT = process.env.PORT;

const ERROR_NOT_FOUND = {Error: 'Not found'}

const app = express();

app.use(express.json());

app.listen(PORT, async ()=>{
    await exercises.connect(true);
    console.log(`Server listening on port: ${PORT}`)
})

/**
* @param {string} date
* Return true if the date format is MM-DD-YY where MM, DD and YY are 2 digit integers
*/
function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function validateInput(n,r,w,u,d){
    if (
    !n || n.length == 0 ||
        !r || r <= 0 ||
        !w || w <= 0 ||
        !u || (u !== "kgs" && u !== "lbs") ||
        !d || !isDateValid(d)
    ) {
        return true;
    }
}

// 1. POST created exercise
app.post('/exercises', asyncHandler(async (req, res) => {
    // Validate request body: check for missing or invalid input.
    console.log("POST /exercises received:", req.body);
    console.log("name:", req.body.name, "length:", req.body.name?.length);
    console.log("reps:", req.body.reps, "type:", typeof req.body.reps);
    console.log("weight:", req.body.weight, "type:", typeof req.body.weight);
    console.log("unit:", req.body.unit);
    console.log("date:", req.body.date, "valid:", isDateValid(req.body.date));
    
    if (
        !req.body.name || req.body.name.length == 0 ||
        !req.body.reps || req.body.reps <= 0 ||
        !req.body.weight || req.body.weight <= 0 ||
        !req.body.unit || (req.body.unit !== "kgs" && req.body.unit !== "lbs") ||
        !req.body.date || !isDateValid(req.body.date)
    ) {
        res.status(400).json({ Error: 'Invalid request' });
    } else {
        console.log("post made it")
        const exercise = await exercises.createExercise(req.body);
        res.status(201).json(exercise).type("application/json");
    }
}));

// 2. GET all exercises.
app.get('/exercises', asyncHandler(async (req, res) => {
    const allExercises = await exercises.getExercises(req.query);
    res.status(200).json(allExercises);
}));

// 3. GET specified exercise.
app.get('/exercises/:_id', asyncHandler( async (req, res) => {
    // Capture ID
    const id = req.params._id;
    // Get specified exercise
    const exercise = await exercises.findExerciseById(id);
    // Validate
    if (exercise !== null) {
        res.json(exercise);
    } else {
        res.status(404).json({ "Error": "Not found" });
    }
}));

// 4. PUT updated exercise.
app.put('/exercises/:_id', asyncHandler(async (req, res) => {
    console.log("PUT /exercises received:", req.params._id, req.body);
    const result = await exercises.updateExercise(req.params._id, req.body);
    console.log("Update result:", result);
    if (result.modifiedCount === 1) {
        res.status(200).json({ _id: req.params._id, ...req.body });
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

// 5. DELETE specified exercise.
app.delete('/exercises/:_id', asyncHandler (async (req, res) => {
    const deletedCount = await exercises.deleteExerciseById(req.params._id);
    if (deletedCount === true) {
        res.status(204).send();
    } else {
        res.status(404).json(ERROR_NOT_FOUND);
    }
}));

export default app;