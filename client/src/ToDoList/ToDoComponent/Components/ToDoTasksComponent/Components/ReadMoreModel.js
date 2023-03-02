import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const ReadMoreModel = ({ description, openReadMore, closeReadMore, setCloseReadMore, setOpenReadMore }) => {
  return (
    <div>
        <Modal show={openReadMore} onHide={setCloseReadMore} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
            <Modal.Title>Task Details</Modal.Title>
        </Modal.Header>
            <Modal.Body>
                {description}
                <div className='align-together'> 
                    <Button variant="primary" type="submit">
                        Add
                    </Button>

                    <div className='padding-button'>
                        <Button variant="secondary" onClick={setCloseReadMore}>
                            Close
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    </div>
  )
}

export default ReadMoreModel;
