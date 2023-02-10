import React from 'react';
import Stack from '@mui/material/Stack';

import './ToDoList.css';
import DoneComponent from './DoneComponent/DoneComponent';
import ToDoComponent from './ToDoComponent/ToDoComponent';

const ToDoList = () => {
  return (
    <div>
        <Stack spacing={2}>
            <ToDoComponent></ToDoComponent>
            <DoneComponent></DoneComponent>
        </Stack>
    </div>
  );
};

export default ToDoList;