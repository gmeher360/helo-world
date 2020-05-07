import React from 'react'
import { Container, row, Row } from 'react-bootstrap';
export default function ContainerMD({ children }) {
    return (
        <React.Fragment>
            <Container fluid="md" style={{ backgroundColor: '#dfe6e9' }}>
                <Row className="justify-content-center">
                    {children}
                </Row>
            </Container>
        </React.Fragment>
    )
}
