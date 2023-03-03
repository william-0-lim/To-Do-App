import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ReadMoreModel.css'

const ReadMoreModel = ({ description, readMoreStatus, closeDialog }) => {
  return (
    <div>
        <Modal show={readMoreStatus} onHide={closeDialog} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Task Description</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                <div className='text-modal'>
                    {description}
                </div>
                <div className='add-padding'>
                    <Button variant="secondary" onClick={closeDialog}>
                        Close
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ReadMoreModel;
