import React from 'react';
import ToDoList from './ToDoList/ToDoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    return (
      <div className="App">
          <h1>Don't Forget Or You Will Be In Trouble</h1>
          <ToDoList></ToDoList>
      </div>
    );
}

export default App;
