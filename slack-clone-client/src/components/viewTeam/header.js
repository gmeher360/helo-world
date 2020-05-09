import React from 'react'
import styled from 'styled-components'
import { Jumbotron } from 'react-bootstrap'
export default function Header() {
    return (
        <StyledHeader>
            <p ># Office</p>
        </StyledHeader>
    )
}


const StyledHeader = styled.div`
    grid-column: 2/3;
    grid-row: 1/2;
    background-color: #E6F0E6;
`