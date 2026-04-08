import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EditExercisePage = ({exerciseToEdit}) => {

    const [name, setName] = useState(exerciseToEdit.name);
    const [reps, setReps] = useState(exerciseToEdit.reps);
    const [weight, setWeight] = useState(exerciseToEdit.weight);
    const [unit, setUnit] = useState(exerciseToEdit.unit);
    const [date, setDate] = useState(exerciseToEdit.date);

    const navigate = useNavigate();

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date};
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/exercises/${exerciseToEdit._id}`, {
                method: "PUT",
                headers: {'Content-type':'application/json'},
                body: JSON.stringify(editedExercise)
            }
        );
        if (response.status == 200){
            alert("successfully edited exercise")
        } else {
            alert("failed to edit exercise, status code " + response.status)
        }
        navigate('/');
    };

    return (
        <div>
            <h1>Edit Exercise</h1>
            <div className="exercise-form-stack">
                <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)} />
                <input
                    type="number"
                    value={reps}
                    onChange={e => setReps(e.target.valueAsNumber)} />
                <input
                    type="text"
                    value={weight}
                    onChange={e => setWeight(e.target.value)} />
                <input
                    type="text"
                    value={unit}
                    onChange={e => setUnit(e.target.value)} />
                <input
                    type="text"
                    value={date}
                    onChange={e => setDate(e.target.value)} />
                <button
                    onClick={editExercise}
                >Update</button>
            </div>
        </div>
    );
}

export default EditExercisePage;