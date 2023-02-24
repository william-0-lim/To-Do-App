import * as React from 'react';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import AddTaskModal from './Components/AddDialogComponent/AddDialog';
import EditTaskModal from './Components/EditDialogComponent/EditDialog';
import { Card, Col,  Pagination } from 'react-bootstrap';
import backgroundVideo from './background.mp4';
import './ToDoComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
const api_base = 'http://localhost:3001';

const ToDoComponent = () => {
    const [todoList, setToDoList] = useState([]);
    const [taskId, setTaskId] = useState();
    const [taskName, setTaskName] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editTaskName, setEditTaskName] = useState('');
    const [editDescriptionName, setEditDescriptionName] = useState('');
    const [addDialogStatus, setAddDialogStatus] = useState(false);
    const [editDialogStatus, setEditDialogStatus] = useState(false);
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
        settingPaignation();
      }, [currentPage, todoList]);
      
    const GetTodos = () => {
		fetch(api_base + '/todos')
			.then(res => res.json())
			.then(data => setToDoList(data))
			.catch((err) => console.error("Error: ", err));
	}

    const handlePageChange = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const settingPaignation = () => {
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

    const editToDo = async (id) => {
        const data = await fetch(api_base + '/todos/update/' + id , {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
				text: editTaskName,
                description: editDescriptionName
			})
        }).then(res => res.json());
    
        setToDoList(
            todoList.map(task => {
                if (task._id === id) {
                    return data;
                } else {
                    return task;
                }
            })
        );

        setEditDialogStatus(false);
    };
    

    const handleCloseAddDialog = () => setAddDialogStatus(false);
    const handleOpenAddDialog = () => setAddDialogStatus(true);

    const handleCloseEditDialog = () => setEditDialogStatus(false);
    const handleOpenEditDialog = (todo) => {
        setEditDialogStatus(true);
        setTaskId(todo._id);
        setEditTaskName(todo.text);
        setEditDescriptionName(todo.description);
    }

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
                                <Button size="small" onClick={() => handleOpenEditDialog(todo)}>EDIT</Button>
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

            <AddTaskModal
                addDialogStatus={addDialogStatus}
                handleCloseAddDialog={handleCloseAddDialog}
                createTask={createTask}
                taskName={taskName}
                setTaskName={setTaskName}
                taskDescription={taskDescription}
                setTaskDescription={setTaskDescription}
            />

            <EditTaskModal
                editDialogStatus={editDialogStatus}
                handleCloseEditDialog={handleCloseEditDialog}
                editTask={editToDo}
                taskName={editTaskName}
                setTaskName={setEditTaskName}
                taskDescription={editDescriptionName}
                setTaskDescription={setEditDescriptionName}
                taskId={taskId}
            />
        </div>
    );
  };
  
  export default ToDoComponent;