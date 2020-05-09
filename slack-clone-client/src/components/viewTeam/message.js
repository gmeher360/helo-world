import React from 'react'
import styled from 'styled-components'
export default function Message() {
    return (
        <StyledMessage>
            <h1>hello</h1>
        </StyledMessage>
    )
}


const StyledMessage = styled.div`
    grid-column:2/3 ;
    grid-row: 2/12;
    background-color: #F2F5F7;
`