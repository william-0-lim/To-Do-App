import React from 'react';
import { Card, Col,  Pagination, Row, CardGroup, Container, Button } from 'react-bootstrap';
import './TodoTasksComponent.css';

const ToDoTask = ({ handleOpenAddDialog, todoList, currentPage, itemsPerPage, handleOpenEditDialog, deleteTodo, handlePageChange, pages, setCurrentPage }) => {
  return (
    <Card className='card-margin outer-card'>
        <Card.Header className='align-together'>
            <h1>TO DO</h1>
            <div className='padding-buttons'>
                <Button size="small" onClick={handleOpenAddDialog}>ADD</Button>
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
                                    <Card.Text>{todo.description}</Card.Text>
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
                        <p>You currently have no tasks</p>
                    )}
                </Row>
            </Container>
        </CardGroup>


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
