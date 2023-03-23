import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const EditTaskModal = ({ editDialogStatus, handleCloseEditDialog, editTask, taskId, taskName, taskDescription, date }) => {
  const [validated, setValidated] = useState(false);
  const [editTaskName, setEditTaskName] = useState('');
  const [editTaskDescription, setEditTaskDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());

  useEffect(() => {
    setEditTaskName(taskName);
    setEditTaskDescription(taskDescription);
    setDueDate(new Date(date).toISOString().substring(0, 10));
  }, [taskName, taskDescription, date]);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      editTask(editTaskName, editTaskDescription, taskId, dueDate);
      handleCloseEditDialog();
      setValidated(false);
    }

    event.preventDefault();
  };

  return (
    <Modal show={editDialogStatus} onHide={handleCloseEditDialog} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a To Do Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="taskName">
                <Form.Label>Task Name</Form.Label>
                <Form.Control 
                  required 
                  type="text" 
                  placeholder="Task Name" 
                  value={editTaskName} 
                  onChange={(e) => setEditTaskName(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a task name.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                  required
                  as="textarea" 
                  rows={3} 
                  placeholder="Write the description of the task here..." 
                  value={editTaskDescription} 
                  onChange={(e) => setEditTaskDescription(e.target.value)} 
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a description for the task.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="dueDate">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                required
                type="date"
                name="duedate"
                placeholder="Due date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please choose a date for this task to be completed.
              </Form.Control.Feedback>
            </Form.Group>

            <div className='align-together'> 
                <Button variant="primary" type="submit">
                    Edit
                </Button>

                <div className='padding-button'>
                    <Button variant="secondary" onClick={handleCloseEditDialog}>
                        Close
                    </Button>
                </div>
            </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditTaskModal;
