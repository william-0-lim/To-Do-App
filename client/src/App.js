import React from 'react';
import ToDoList from './ToDoList/ToDoList';
import ParticleBackground from './MovingBackground/Particles';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <div>
          {/* <ParticleBackground id="tsparticles" /> */}
          <h1 className='header neon'>TO DO OR NOT TO DO</h1>
          <ToDoList></ToDoList>
      </div>
    );
}

export default App;
