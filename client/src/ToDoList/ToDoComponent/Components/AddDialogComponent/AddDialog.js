import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useState } from 'react';

const AddTaskModal = ({ addDialogStatus, handleCloseAddDialog, createTask }) => {
  const [validated, setValidated] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);

    if (form.checkValidity() === true) {
      createTask(taskName, taskDescription);
      handleCloseAddDialog();
    }

    event.preventDefault();
  };

  return (
    <Modal show={addDialogStatus} onHide={handleCloseAddDialog} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add a To Do Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="taskName">
            <Form.Label>Task Name</Form.Label>
            <Form.Control required type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
            <Form.Control.Feedback type="invalid">
              Please enter a task name.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Write the description of the task here..." value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
          </Form.Group>

          <Button variant="secondary" onClick={handleCloseAddDialog}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTaskModal;
