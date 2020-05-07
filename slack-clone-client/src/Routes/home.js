import React from 'react'
import Register from '../components/register'
import { Container, row, Row } from 'react-bootstrap';

export default function Home() {
    return (
        <React.Fragment>
            <Container fluid="md" style={{ backgroundColor: '#dfe6e9' }}>
                <Row className="justify-content-center">
                    <Register></Register>
                </Row>
            </Container>
        </React.Fragment>
    )

}
