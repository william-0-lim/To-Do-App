import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditTaskModal = ({ editDialogStatus, handleCloseEditDialog, editTask, taskName, setTaskName, taskDescription, setTaskDescription }) => {
  return (
    <Modal show={editDialogStatus} onHide={handleCloseEditDialog} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a To Do Task</Modal.Title>
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
        <Button variant="secondary" onClick={handleCloseEditDialog}>Close</Button>
        <Button variant="primary" onClick={editTask}>Add</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
