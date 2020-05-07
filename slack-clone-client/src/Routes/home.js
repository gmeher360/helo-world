import React from 'react'
import Login from '../components/login'
import { Container, row, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ContainerMD } from '../components/custom'
export default function Home() {
    return (
        <ContainerMD>
            <Login />
        </ContainerMD>
    )

}
