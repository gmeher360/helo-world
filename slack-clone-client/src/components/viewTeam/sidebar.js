import React from 'react'
import styled from 'styled-components'
import TeamSidebar from './teamSidebar'
import ChannelSidebar from './channelSidebar'
import { useQuery } from '@apollo/client'
import { GET_ALL_TEAMS, GET_ALL_CHANNELS_BY_TEAM_ID } from '../../services/schema'
import { useParams } from 'react-router-dom'

const directMessages = [{ id: 1, username: "shyam Meher", online: true }, { id: 2, username: "zack dorsey", online: true }, { id: 5, username: "Joseph Varghesse", online: false }]
export default function Sidebar() {

    let { teamId, channelId } = useParams();
    const { data: teamsData, loading: teamsLoading, error: teamsError } = useQuery(GET_ALL_TEAMS)
    const { data: channelsData, loading: channelsLoading, error: channelsError } = useQuery(GET_ALL_CHANNELS_BY_TEAM_ID, { variables: { teamId: parseInt(teamId) } })
    return (
        <StyledSidebar>
            <TeamSidebar teams={teamsData && teamsData.getAllTeams.teams} />
            <ChannelSidebar channels={channelsData && channelsData.getAllChannelsByTeamId.channels} directMessages={directMessages} />
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