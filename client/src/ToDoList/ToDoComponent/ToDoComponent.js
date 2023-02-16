import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';

import { Modal, Form, Card, Col,  Pagination } from 'react-bootstrap';
import backgroundVideo from './background.mp4';
import './ToDoComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const api_base = 'http://localhost:3001';

const ToDoComponent = () => {
    const [todoList, setToDoList] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [addDialogStatus, setAddDialogStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);
    const [itemsPerPage] = useState(4);
  
    useEffect(() => {
        GetTodos();
        const storedPage = localStorage.getItem("currentPage");
        if (storedPage) {
          setCurrentPage(JSON.parse(storedPage));
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem("currentPage", JSON.stringify(currentPage));
        testing();
      }, [currentPage]);

    useEffect(() => {
        testing();
    }, [todoList]);
      
    const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setToDoList(data))
			.catch((err) => console.error("Error: ", err));
	}

    const handlePageChange = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const testing = () => {
        const newPages = [];
        for (let number = 1; number <= Math.ceil(todoList.length / itemsPerPage); number++) {
            newPages.push(number);
        }
        setPages(newPages);
    };

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
            
            <video className='videoTag' autoPlay loop muted>
                <source src={backgroundVideo} type='video/mp4' />
            </video>

            <div className='align-together'>
                <h1 className='title'>TO DO</h1>
                <Button size="small" onClick={handleOpenAddDialog}>ADD</Button>
            </div>
            <div className='card-group'>
                {todoList.length > 0 ? todoList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map(todo => (
                    <Col key={todo._id}>
                        <Card className="card-body">
                            <Card.Header as="h5">{todo.text}</Card.Header>
                            <Card.Body>
                                <Card.Title>Special title treatment</Card.Title>
                                <Card.Text>{todo.description}</Card.Text>
                                <Button size="small">EDIT</Button>
                                <Button size="small" onClick={() => deleteTodo(todo._id)}>DELETE</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )) : (
                    <p>You currently have no tasks</p>
                )}
            </div>
            <Pagination onChange={handlePageChange}>
                {pages.map((page, index) => (
                    <Pagination.Item 
                    key={index} 
                    active={currentPage === page} 
                    onClick={() => setCurrentPage(page)}
                    >
                    {page}
                    </Pagination.Item>
                ))}
            </Pagination>


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