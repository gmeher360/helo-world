import React from 'react'
import styled from 'styled-components'
import TeamSidebar from './teamSidebar'
import ChannelSidebar from './channelSidebar'

const channels = [{id:1,name:"office"},{id:2,name:"GoogleProject"},{id:3,name:"Jr.Dev"}]
const teams = [{id:1,name:"Adobe"},{id:2,name:"JS for Life"}, {id:3,name:"LA soccer"}]
export default function Sidebar() {
    return (
        <StyledSidebar>
            <TeamSidebar teams={teams}/>
            <ChannelSidebar channels = {channels}/>
        </StyledSidebar>
    )
}

const StyledSidebar = styled.div`
    grid-column: 1/2;
    grid-row: 1/17;
    background-color: #428D9E;
    display: flex;
    flex-direction: row;
`