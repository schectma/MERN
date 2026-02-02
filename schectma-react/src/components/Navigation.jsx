import { Link } from 'react-router-dom';

function Navigation(){
  return (
    <nav>
        <Link to="/">Home</Link>
        <Link to="/edit-exercise">Edit Exercise</Link>
        <Link to="/add-exercise">Create Exercise</Link>
    </nav>
  );
};

export default Navigation;