import React from 'react';
import { Card, Col,  Pagination, Row, CardGroup, Container, Button } from 'react-bootstrap';
import './SoonToBeDone.css';

const SoonToBeDone = ({ soonDueTaskList, currentSoonDuePage, itemsPerPage ,setCurrentSoonDuePage, handleSoonDuePageChange, soonDuePages, handleOpenEditDialog, handleOpenDeleteDialog, openReadMoreModel }) => {

    return (
        <Card className='card-margin outer-card'>
        <Card.Header className='align-together'>
            <h1>SOON DUE</h1>
        </Card.Header>
        <CardGroup className='card-group-padding'>
            <Container>
                <Row className='row-css'>
                    {soonDueTaskList.length > 0 ? soonDueTaskList.slice((currentSoonDuePage - 1) * itemsPerPage, currentSoonDuePage * itemsPerPage).slice(0, 4).map((todo, index) => (
                        <Col key={todo._id}>
                            <Card className='card-container'>
                                <Card.Body>
                                    <Card.Title>{todo.text}</Card.Title>
                                    <Card.Text>
                                    {todo.description.length > 100 ?
                                        <div>
                                            {`${todo.description.substring(0, 100)}...`}
                                            <button className='button-change' onClick={() => openReadMoreModel(todo.description)}>Expand More</button>
                                        </div>
                                        : 
                                        <div className='description'>
                                            {todo.description}
                                        </div>
                                    }
                                    </Card.Text>
                                    <Card.Text>
                                        <div className='due-date'>
                                            {todo.dueDate.slice(0,10)}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <div className='align-together'>
                                        <Button size="small" onClick={() => handleOpenEditDialog(todo)}>EDIT</Button>
                                        <div className='padding-buttons'>
                                            <Button size="small" onClick={() => handleOpenDeleteDialog(todo)}>DELETE</Button>
                                        </div>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </Col>
                    )) : (
                        <div class="container">
                            <p class="center-text text">No Tasks Due Soon Yet. Good Job C:</p>
                        </div>
                    )}
                </Row>
            </Container>
        </CardGroup>

        <Pagination className='paignation-padding' onChange={handleSoonDuePageChange}>
            {soonDuePages.map((page, index) => (
                <Pagination.Item
                    key={index}
                    active={currentSoonDuePage === page}
                    onClick={() => setCurrentSoonDuePage(page)}
                >
                    {page}
                </Pagination.Item>
        ))}
        </Pagination>

        </Card>
    );
}


export default SoonToBeDone