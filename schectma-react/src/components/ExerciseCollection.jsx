import ExerciseItem from './ExerciseItem';

function ExerciseCollection({ exercises, onDelete, onEdit}) {
    if (!exercises.length) {
        return <p className="home-empty">No exercises yet. Add one to get started.</p>;
    }

    return (
        <div className="collection-container">
            {exercises.map((exercise, i) => <ExerciseItem exercise={exercise} 
                    onDelete={onDelete} onEdit={onEdit} key={i} />)}
        </div>

    );
}

export default ExerciseCollection;