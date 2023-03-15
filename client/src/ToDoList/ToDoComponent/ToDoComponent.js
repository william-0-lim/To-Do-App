import * as React from 'react';
import { useEffect, useState } from 'react';
import AddTaskModal from './Components/AddDialogComponent/AddDialog';
import EditTaskModal from './Components/EditDialogComponent/EditDialog';
import ToDoTask from './Components/ToDoTasksComponent/ToDoTask';
import backgroundVideo from './background.mp4';
import { toast } from 'react-toastify';
import axios from 'axios';
import './ToDoComponent.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoonToBeDone from './Components/SoonToBeDoneDialogComponent/SoonToBeDone';
const api_base = 'https://william-0-lim-turbo-spork-75r5674pr42r95p-3001.preview.app.github.dev';

const ToDoComponent = () => {
    const [todoList, setToDoList] = useState([]);
    const [taskId, setTaskId] = useState();
    const [editTaskName, setEditTaskName] = useState('');
    const [editDescriptionName, setEditDescriptionName] = useState('');
    const [soonDueTaskList, setSoonDueTaskList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [addDialogStatus, setAddDialogStatus] = useState(false);
    const [editDialogStatus, setEditDialogStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSoonDuePage, setCurrentSoonDuePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [soonDuePages, setSoonDuePages] = useState([]);
    const [itemsPerPage] = useState(4);
  
    useEffect(() => {
        getTodos();
        const storedPage = localStorage.getItem("currentPage");
        const storedSoonDuePage = localStorage.getItem("currentSoonDuePage");

        if (storedPage) {
          setCurrentPage(JSON.parse(storedPage));
        }

        if (storedSoonDuePage) {
            setCurrentSoonDuePage(JSON.parse(storedSoonDuePage));
        }
      }, []);
      
      useEffect(() => {
        localStorage.setItem("currentPage", JSON.stringify(currentPage));
        localStorage.setItem("currentSoonDuePage", JSON.stringify(currentSoonDuePage));
        settingPaignation(todoList, setPages);
        settingPaignation(soonDueTaskList, setSoonDuePages);
      }, [currentPage, todoList, currentSoonDuePage, soonDueTaskList]);

    const getTodos = () => {
        axios.get(api_base + '/todos')
          .then(res => separatingToDoList(res.data))
          .catch((err) => console.error("Error: ", err));
    }

    const handlePageChange = (page) => {
        setCurrentSoonDuePage(page.selected + 1);
    };

    const handleSoonDuePageChange = (page) => {
        setCurrentPage(page.selected + 1);
    };

    const separatingToDoList = (list) => {
        // Separating the to do list by tasks and tasks that are due soon
        const regularToDoList = [];
        const dueDateSoonList = [];
        for (const data of list) {
            if (isDueDateClose(data.dueDate)) {
                dueDateSoonList.push(data);
            } else {
                regularToDoList.push(data);
            }
        }

        setToDoList(regularToDoList);
        setSoonDueTaskList(dueDateSoonList);
    }

    const isDueDateClose = (dateString) => {
        const dueDate = new Date(dateString);
        const currentDate = new Date();
        const dayDifference = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
      
        return dayDifference <= 2 && dayDifference >= 0;
    }    

    const settingPaignation = (list, settingPage) => {
        const newPages = [];
        for (let number = 1; number <= Math.ceil(list.length / itemsPerPage); number++) {
            newPages.push(number);
        }
        settingPage(newPages);
    };

	const createTask = async (name, description, dueDate) => {
        axios.post(api_base + "/todos/new", {
            text: name,
            description: description,
            dueDate: dueDate
          }, {
            headers: {
                "Content-Type": "application/json" 
            }
          })
          .then(function (response) {
            getTodos();
            toast.success('Task saved successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
          })
          .catch(function (error) {
            console.log(error);
          });
	}

    const deleteTodo = async (id) => {
        axios.delete(api_base + '/todos/delete/' + id)
            .then(function (response) {
                getTodos();
                toast.success('Task deleted successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch(function (error) {
                console.log(error)
            });
	}

    const editToDo = async (editTaskName, editDescriptionName, id, date) => {
        axios.put(api_base + "/todos/update/" + id, {
            text: editTaskName,
            description: editDescriptionName,
            dueDate: date
          }, {
            headers: {
                "Content-Type": "application/json" 
            }
          })
          .then(function (response) {
            setToDoList(
                todoList.map(task => {
                    if (task._id === id) {
                        return response.data;
                    } else {
                        return task;
                    }
                })
            );
            getTodos();
            toast.success('Task edited successfully!', {
                position: toast.POSITION.TOP_RIGHT
            });
            setEditDialogStatus(false);
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    

    const handleCloseAddDialog = () => setAddDialogStatus(false);;
    const handleOpenAddDialog = () => setAddDialogStatus(true);

    const handleCloseEditDialog = () => setEditDialogStatus(false);
    const handleOpenEditDialog = (todo) => {
        setEditDialogStatus(true);
        setTaskId(todo._id);
        setEditTaskName(todo.text);
        setEditDescriptionName(todo.description);
        setDate(todo.dueDate);
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

            <SoonToBeDone
                soonDueTaskList={soonDueTaskList}
                currentSoonDuePage={currentSoonDuePage}
                itemsPerPage={itemsPerPage}
                setCurrentSoonDuePage={setCurrentSoonDuePage}
                handleSoonDuePageChange={handleSoonDuePageChange}
                soonDuePages={soonDuePages}
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
                taskId={taskId}
                taskName={editTaskName}
                taskDescription={editDescriptionName}
                date={date}
            />
        </div>
    );
  };
  
  export default ToDoComponent;

