import * as React from 'react';
import { useEffect, useState } from 'react';
import AddTaskModal from './Components/AddDialogComponent/AddDialog';
import EditTaskModal from './Components/EditDialogComponent/EditDialog';
import ToDoTask from './Components/ToDoTasksComponent/ToDoTask';
import backgroundVideo from './background.mp4';
import { toast } from 'react-toastify';
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
    const [validated, setValidated] = useState(false);
  
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

	const createTask = async (name, description) => {
        const data = await fetch(api_base + "/todos/new", {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                text: name,
                description: description

            })
            }).then(res => res.json());
              
            setToDoList([...todoList, data]);
            toast.success('Task saved successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
        
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
    

    const handleCloseAddDialog = () => setAddDialogStatus(false);;
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

            <ToDoTask
                handleOpenAddDialog={handleOpenAddDialog}
                todoList={todoList}
                currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                handleOpenEditDialog={handleOpenEditDialog}
                deleteTodo={deleteTodo}
                handlePageChange={handlePageChange}
                pages={pages}
                setCurrentPage={setCurrentPage}
            />
        

            <AddTaskModal
                addDialogStatus={addDialogStatus}
                handleCloseAddDialog={handleCloseAddDialog}
                createTask={createTask}
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

