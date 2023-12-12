import React from 'react';
import Testfetch from './jsxfiles/Testfetch';
import { useParams } from 'react-router-dom';

const Movie = () => {
  let { id } = useParams(); // This retrieves the :id parameter from the route

  return (
    <div>
      {id ? <Testfetch movieId={id} /> : <h2>Welcome to the Home Page!</h2>}
      {/* Render Testfetch only if there is an ID, otherwise show the homepage message */}
        
    </div>
  );
}

export default Movie;