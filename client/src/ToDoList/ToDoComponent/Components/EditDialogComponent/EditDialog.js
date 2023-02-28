import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const EditTaskModal = ({ editDialogStatus, handleCloseEditDialog, editTask, taskName, setTaskName, taskDescription, setTaskDescription, taskId }) => {
  return (
    <Modal show={editDialogStatus} onHide={handleCloseEditDialog} backdrop="static" keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit a To Do Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3" controlId="taskName">
          <Form.Label>Task Name</Form.Label>
          <Form.Control value={taskName} onChange={e => setTaskName(e.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={taskDescription} onChange={e => setTaskDescription(e.target.value)} />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseEditDialog}>Close</Button>
        <Button variant="primary" onClick={() => editTask(taskId)}>Edit</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditTaskModal;
