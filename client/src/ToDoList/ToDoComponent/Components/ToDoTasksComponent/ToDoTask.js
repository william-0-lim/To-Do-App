import React from 'react';
import { useState } from 'react';
import { Card, Col,  Pagination, Row, CardGroup, Container, Button } from 'react-bootstrap';
import ReadMoreModel from './Components/ReadMoreModel';
import './TodoTasksComponent.css';

const ToDoTask = ({ handleOpenAddDialog, todoList, currentPage, itemsPerPage, handleOpenEditDialog, deleteTodo, handlePageChange, pages, setCurrentPage }) => {
    const [closeReadMore, setCloseReadMore] = useState(false);
    const [openReadMore, setOpenReadMore] = useState(false);
    const [description, setDescription] = useState('');

    const openReadMoreModel = (description) => {
        setOpenReadMore(true);
        setDescription(description);
    }

    const 
    return (
        <Card className='card-margin outer-card'>
            <Card.Header className='align-together'>
                <h1>TO DO</h1>
                <div className='padding-buttons'>
                    <button className="spaceship-button" onClick={handleOpenAddDialog}>ADD</button>
                </div>
            </Card.Header>
            <CardGroup className='card-group-padding'>
                <Container>
                    <Row className='row-css'>
                        {todoList.length > 0 ? todoList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).slice(0, 4).map((todo, index) => (
                            <Col key={todo._id}>
                                <Card className='card-container'>
                                    <Card.Body>
                                        <Card.Title>{todo.text}</Card.Title>
                                        <Card.Text>
                                        {todo.description.length > 108 ?
                                            <div>
                                                {`${todo.description.substring(0, 108)}...`}
                                                <button onClick={() => openReadMoreModel(todo.description)}>Expand More</button>
                                            </div>
                                            : todo.description
                                        }
                                        </Card.Text>
                                    </Card.Body>
                                    <Card.Footer>
                                        <div className='align-together'>
                                            <Button size="small" onClick={() => handleOpenEditDialog(todo)}>EDIT</Button>
                                            <div className='padding-buttons'>
                                                <Button size="small" onClick={() => deleteTodo(todo._id)}>DELETE</Button>
                                            </div>
                                        </div>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        )) : (
                            <div class="container">
                                <p class="center-text text">No Tasks!! Go make some right now!!</p>
                            </div>
                        )}
                    </Row>
                </Container>
            </CardGroup>
            
            <ReadMoreModel
                description={description}
                openReadMore={openReadMore}
                closeReadMore={closeReadMore}
                setCloseReadMore={setCloseReadMore}
                setOpenReadMore={setOpenReadMore}
            />

            <Pagination className='paignation-padding' onChange={handlePageChange}>
                {pages.map((page, index) => (
                    <Pagination.Item
                        key={index}
                        active={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Card>
    );
}

export default ToDoTask;
