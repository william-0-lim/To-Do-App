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
import TasksDone from './Components/TasksDoneDialogComponent/TasksDone';
import DeleteDialog from './Components/DeleteDialogComponent/DeleteDialog';
import ReadMoreModel from './Components/ToDoTasksComponent/Components/ReadMoreModel';

const api_base = 'https://william-0-lim-turbo-spork-75r5674pr42r95p-3001.preview.app.github.dev';

const ToDoComponent = () => {
    const [todoList, setToDoList] = useState([]);
    const [taskId, setTaskId] = useState();
    const [editTaskName, setEditTaskName] = useState('');
    const [editDescriptionName, setEditDescriptionName] = useState('');
    const [soonDueTaskList, setSoonDueTaskList] = useState([]);
    const [tasksDoneList, setTasksDoneList] = useState([]);
    const [date, setDate] = useState(new Date());
    const [addDialogStatus, setAddDialogStatus] = useState(false);
    const [editDialogStatus, setEditDialogStatus] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentSoonDuePage, setCurrentSoonDuePage] = useState(1);
    const [currentTasksDonePage, setCurrentTasksDonePage] = useState(1);
    const [pages, setPages] = useState([]);
    const [soonDuePages, setSoonDuePages] = useState([]);
    const [donePages, setDonePages] = useState([]);
    const [itemsPerPage] = useState(4);
    const [deleteDialogStatus, setDeleteDialogStatus] = useState(false);
    const [deleteTaskContent, setDeleteTaskContent] = useState();
    const [readMoreStatus, setReadMoreStatus] = useState(false);
    const [description, setDescription] = useState('');

  
    useEffect(() => {
        getTodos();
        const storedPage = localStorage.getItem("currentPage");
        const storedSoonDuePage = localStorage.getItem("currentSoonDuePage");
        const storedTasksDonePage = localStorage.getItem("currentTasksDonePage");

        if (storedPage) {
            setCurrentPage(JSON.parse(storedPage));
        }

        if (storedSoonDuePage) {
            setCurrentSoonDuePage(JSON.parse(storedSoonDuePage));
        }

        if (storedTasksDonePage) {
            setCurrentTasksDonePage(JSON.parse(storedTasksDonePage));
        }
    }, []);
      
    useEffect(() => {
        localStorage.setItem("currentPage", JSON.stringify(currentPage));
        localStorage.setItem("currentSoonDuePage", JSON.stringify(currentSoonDuePage));
        localStorage.setItem("currentTasksDonePage", JSON.stringify(currentTasksDonePage));
        settingPaignation(todoList, setPages);
        settingPaignation(soonDueTaskList, setSoonDuePages);
        settingPaignation(tasksDoneList, setDonePages);
    }, [currentPage, todoList, currentSoonDuePage, soonDueTaskList, currentTasksDonePage, tasksDoneList]);

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

    const handleTasksDonePageChange = (page) => {
        setCurrentTasksDonePage(page.selected + 1);
    }

    const separatingToDoList = (list) => {
        // Separating the to do list by tasks and tasks that are due soon and Tasks Done List
        const regularToDoList = [];
        const dueDateSoonList = [];
        const tasksDoneList = [];
        for (const data of list) {
            const dueDate = new Date(data.dueDate);
            const currentDate = new Date();
            const dayDifference = Math.ceil((dueDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
            
            // If the day difference is bigger than 2 days, it goes into Regular To Do List
            if (dayDifference > 2) {
                regularToDoList.push(data);
            } else {
                // If the day difference is less than 2 days and bigger than 0 days, then it goes into Due Date Soon 
                if (dayDifference >= 0) {
                    dueDateSoonList.push(data);
                } else {
                    // The rest going into Tasks Done List
                    tasksDoneList.push(data);
                }
            }
        }

        setToDoList(regularToDoList);
        setSoonDueTaskList(dueDateSoonList);
        setTasksDoneList(tasksDoneList);
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
                setDeleteDialogStatus(false);
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

    const handleCloseDeleteDialog = () => { setDeleteDialogStatus(false) };
    const handleOpenDeleteDialog = (todo) => {
        setDeleteDialogStatus(true);
        setDeleteTaskContent(todo);
    }

    const closeDialog = () => { setReadMoreStatus(false) };
    const openReadMoreModel = (description) => {
        setReadMoreStatus(true);
        setDescription(description);
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
                handlePageChange={handlePageChange}
                pages={pages}
                setCurrentPage={setCurrentPage}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                openReadMoreModel={openReadMoreModel}
            />

            <SoonToBeDone
                soonDueTaskList={soonDueTaskList}
                currentSoonDuePage={currentSoonDuePage}
                itemsPerPage={itemsPerPage}
                setCurrentSoonDuePage={setCurrentSoonDuePage}
                handleSoonDuePageChange={handleSoonDuePageChange}
                soonDuePages={soonDuePages}
                handleOpenEditDialog={handleOpenEditDialog}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                openReadMoreModel={openReadMoreModel}
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

            <TasksDone
                tasksDoneList={tasksDoneList}
                currentTasksDonePage={currentTasksDonePage}
                itemsPerPage={itemsPerPage}
                setCurrentTasksDonePage={setCurrentTasksDonePage}
                handleTasksDonePageChange={handleTasksDonePageChange}
                donePages={donePages}
                handleOpenDeleteDialog={handleOpenDeleteDialog}
                openReadMoreModel={openReadMoreModel}
            />

            <DeleteDialog
                deleteDialogStatus={deleteDialogStatus}
                handleCloseDeleteDialog={handleCloseDeleteDialog}
                deleteTaskContent={deleteTaskContent}
                deleteTodo={deleteTodo}
            />
            
            <ReadMoreModel
                description={description}
                readMoreStatus={readMoreStatus}
                closeDialog={closeDialog}
            />
        </div>
    );
  };
  
  export default ToDoComponent;

