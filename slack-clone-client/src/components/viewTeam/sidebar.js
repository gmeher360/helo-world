import React, { useEffect } from 'react'
import styled from 'styled-components'
import TeamSidebar from './teamSidebar'
import ChannelSidebar from './channelSidebar'
import { useQuery } from '@apollo/client'
import { GET_ALL_TEAMS, GET_ALL_CHANNELS_BY_TEAM_ID } from '../../services/schema'
import { useParams, withRouter, useHistory, Redirect } from 'react-router-dom'

const directMessages = [{ id: 1, username: "shyam Meher", online: true }, { id: 2, username: "zack dorsey", online: true }, { id: 5, username: "Joseph Varghesse", online: false }]
function Sidebar({ teamsArray }) {
    const history = useHistory();
    const { teamId, channelId } = useParams();
    const { data: channelsData, loading: channelsLoading, error: channelsError } = useQuery(GET_ALL_CHANNELS_BY_TEAM_ID, { variables: { teamId: parseInt(teamId) } })
    const channelsArray = channelsData && channelsData.getAllChannelsByTeamId.channels
    const currentTeam = teamsArray && teamsArray.find(team => team.id == teamId)
    useEffect(() => {
        if (!teamId && teamsArray && teamsArray.length !== 0) {
            history.push(`/view-team/${teamsArray[0].id}`)
            return
        }
    }, [teamsArray, teamId])
    return (
        <StyledSidebar>
            <TeamSidebar teams={teamsArray} />
            <ChannelSidebar channels={channelsArray} directMessages={directMessages} currentTeam={currentTeam} />
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

export default Sidebar;