import React from 'react';
import ToDoList from './ToDoList/ToDoList';
import ParticleBackground from './MovingBackground/Particles';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <div>
          {/* <ParticleBackground id="tsparticles" /> */}
          <h1 className='header'>Don't Forget Or You Will Be In Trouble</h1>
          <ToDoList></ToDoList>
      </div>
    );
}

export default App;
