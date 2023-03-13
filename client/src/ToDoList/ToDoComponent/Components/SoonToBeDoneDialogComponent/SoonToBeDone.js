import React from 'react';
import { useState } from 'react';
import { Card, Col,  Pagination, Row, CardGroup, Container, Button } from 'react-bootstrap';
import './SoonToBeDone.css';

const SoonToBeDone = () => {
    return (
        <Card className='card-margin outer-card'>
            <Card.Header>
                <h1>SOON DUE</h1>
            </Card.Header>
            <CardGroup className='card-group-padding'>
                <Container>
                    <Row className='row-css'>
                        <div class="container">
                            <p class="center-text text">No Tasks Due Soon Yet. Good Job C: </p>
                        </div>
                    </Row>
                </Container>
            </CardGroup>

            {/* <Pagination className='paignation-padding' onChange={handlePageChange}>
                {pages.map((page, index) => (
                    <Pagination.Item
                        key={index}
                        active={currentPage === page}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </Pagination.Item>
                ))}
            </Pagination> */}
        </Card>
    );
}


export default SoonToBeDone