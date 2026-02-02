import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AddExercisePage = () => {

    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    const addExercise = async () => {
        console.log("addExercise");
        const newExercise = {
            name, 
            reps: parseInt(reps) || 0, 
            weight: parseFloat(weight) || 0, 
            unit, 
            date
        };
        const response = await fetch(
            '/exercises', {
                method: "POST",
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(newExercise)
            }
        );
        console.log("Response status:", response.status);
        if (response.status == 200 || response.status == 201){
            const data = await response.json();
            console.log("Created exercise:", data);
            alert("successfully added exercise")
            navigate('/');
        } else {
            alert(`failed to add exercise, status code ${response.status}`)
        }
    };

    return (
        <div>
            <h1>Add Exercise</h1>
            <input
                type="text"
                placeholder="Enter name here"
                value={name}
                onChange={e => setName(e.target.value)} />
            <input
                type="number"
                value={reps}
                placeholder="Enter reps here"
                onChange={e => setReps(e.target.value)} />
            <input
                type="number"
                placeholder="Enter weight here"
                value={weight}
                onChange={e => setWeight(e.target.value)} />
            <input
                type="text"
                placeholder="Enter unit here"
                value={unit}
                onChange={e => setUnit(e.target.value)} />
            <input
                type="text"
                placeholder="Enter date here"
                value={date}
                onChange={e => setDate(e.target.value)} />
            <button
                onClick={addExercise}
            >Add</button>
        </div>
    );
}

export default AddExercisePage;