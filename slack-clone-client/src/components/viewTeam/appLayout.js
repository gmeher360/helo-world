import React from 'react'
import styled from 'styled-components'
import Footer from './footer'
import Sidebar from './sidebar'
import Message from './message'
import Header from './header'
export default function AppLayout({ teamsArray, currentTeam }) {
    return (
        <StyledHeader>
            <Header />
            <Sidebar teamsArray={teamsArray} currentTeam={currentTeam} />
            <Message />
            <Footer />
        </StyledHeader>
    )
}


const StyledHeader = styled.div`
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 250px 1fr;
    grid-template-rows: repeat(12,1fr);
    align-items: stretch;
    justify-items:stretch;
`