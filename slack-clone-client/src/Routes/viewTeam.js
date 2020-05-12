import React from 'react'
import Login from '../components/login'
import ViewTeam from '../components/viewTeam'
import { useParams, Redirect } from 'react-router-dom';
import { GET_ALL_TEAMS } from '../services/schema';
import { useQuery } from '@apollo/client';
export default function Home() {
    const { data: teamsData, loading: teamsLoading, error: teamsError } = useQuery(GET_ALL_TEAMS)
    let teamsArray = teamsData && teamsData.getAllTeams.ok && [...teamsData.getAllTeams.teams, ...teamsData.getInvitedTeams.teams];
    const { teamId, channelId } = useParams();
    if (teamsArray && teamsArray.length === 0) {
        return (<Redirect to="/create-team" />)
    }
    if (!parseInt(teamId) && teamsArray && teamsArray.length) {
        return (<Redirect to={`/view-team/${teamsArray[0].id}`} />)
    }
    const currentTeam = teamsArray && teamsArray.find(team => team.id == teamId)

    return (
        teamsArray && teamsArray.length > 0 ? (
            <ViewTeam teamsArray={teamsArray} currentTeam={currentTeam} />
        ) : null
    )
}
