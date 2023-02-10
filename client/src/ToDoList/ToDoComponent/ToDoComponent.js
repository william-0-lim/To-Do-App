import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardActions, CardContent, Button, Typography } from '@mui/material';

import { Modal, Form } from 'react-bootstrap';
import './ToDoComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const api_base = 'http://localhost:3001';

const ToDoComponent = () => {
    const [todoList, setToDoList] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [addDialogStatus, setAddDialogStatus] = useState(false);

    useEffect(() => {
		GetTodos();
	}, []);
      
    const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setToDoList(data))
			.catch((err) => console.error("Error: ", err));
	}

	const createTask = async () => {
		const data = await fetch(api_base + "/todos/new", {
			method: "POST",
			headers: {
				"Content-Type": "application/json" 
			},
			body: JSON.stringify({
				text: taskName,
                description: taskDescription

			})
		}).then(res => res.json());

		setToDoList([...todoList, data]);

		setAddDialogStatus(false);
        setTaskName("");
		setTaskDescription("");
	}

    const deleteTodo = async (id) => {
		const data = await fetch(api_base + '/todos/delete/' + id, { method: "DELETE" }).then(res => res.json());

		setToDoList(todoList => todoList.filter(todo => todo._id !== data._id));
	}

    const handleCloseAddDialog = () => setAddDialogStatus(false);
    const handleOpenAddDialog = () => setAddDialogStatus(true);

    return (
        <div>
            <div className='align-together'>
                <h1>TO DO</h1>
                <Button size="small" onClick={handleOpenAddDialog}>ADD</Button>
            </div>

            {todoList.length > 0 ? todoList.map(todo => (
                <Card key={todo._id} className="card-body">
                    <CardContent>
                        <Typography variant="h5" component="div">
                        {todo.text}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        Time: 
                        </Typography>
                        <Typography variant="body2">
                        {todo.description}
                        <br />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">EDIT</Button>
                        <Button size="small" onClick={() => deleteTodo(todo._id)}>DELETE</Button>
                    </CardActions>
                </Card>
            )) : (
                <p>You currently have no tasks</p>
            )}



            <Modal show={addDialogStatus} onHide={handleCloseAddDialog} backdrop="static" keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a To Do Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control placeholder="Start writing..." value={taskName} onChange={e => setTaskName(e.target.value)}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control placeholder="Write the description of the task here..." value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddDialog}>Close</Button>
                    <Button variant="primary" onClick={createTask}>Add</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
  };
  
  export default ToDoComponent;