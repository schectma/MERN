import { Link, useNavigate } from 'react-router-dom';
import ExerciseCollection from '../components/ExerciseCollection';
import { useState, useEffect } from 'react';

export const HomePage = ({ setExerciseToEdit }) => {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    const loadExercises = async () => {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/exercises`);
        const data = await response.json();
        setExercises(data);
    };

    useEffect(() => {
        loadExercises();
    }, []);

    const onDelete = async(_id)=>{
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/exercises/${_id}`,
            {method: 'DELETE'}
        );
        if (response.status == 204){
            // alert(`Successfully deleted ID ${exercise._id}`);
            setExercises(exercises.filter((m) => m._id !== _id));
        } else {
            alert(`Failed to delete ID ${_id}; response code ${response.status}`);
        }
    };

    const onEdit = (exercise) => {
        setExerciseToEdit(exercise);
        navigate('/edit-exercise');
    };

    return (
        <>
            <h2>List of exercises</h2>
            <ExerciseCollection exercises={exercises} onDelete={onDelete} onEdit={onEdit}></ExerciseCollection>
            <Link to="/add-exercise">Add an exercise</Link>
        </>
    );
};

export default HomePage;