import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './DeleteDialog.css'

const DeleteDialog = ({deleteDialogStatus , handleCloseDeleteDialog, deleteTaskContent, deleteTodo }) => {
  return (
    <div>
        <Modal show={deleteDialogStatus} onHide={handleCloseDeleteDialog} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Delete Task Confirmation</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <div className='text-modal'>
                    Are you sure you want to delete this task? Once deleted, it will be gone forever.
                </div>
                <div className='align-together'>
                    <Button size="small" onClick={() => deleteTodo(deleteTaskContent._id)}>DELETE</Button>
                    <div className='padding-buttons'>
                        <Button size="small" onClick={handleCloseDeleteDialog}>CLOSE</Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default DeleteDialog;