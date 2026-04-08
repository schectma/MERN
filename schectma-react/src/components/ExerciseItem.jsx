import '../App.css';

function ExerciseItem({ exercise, onDelete, onEdit}) {

    return (
        <div className="collection-item">
            <h3 className="collection-title">{exercise.name}</h3>
            <p className="collection-meta">{exercise.reps} reps | {exercise.weight} {exercise.unit} | {exercise.date}</p>
            <div className="collection-actions">
                <button type="button" className="action-btn" onClick={() => onEdit(exercise)}>Edit</button>
                <button type="button" className="action-btn danger-btn" onClick={() => onDelete(exercise._id)}>Delete</button>
            </div>
        </div>
    );
}

export default ExerciseItem;