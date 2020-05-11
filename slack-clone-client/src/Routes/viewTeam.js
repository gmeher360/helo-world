import React from 'react'
import Login from '../components/login'
import ViewTeam from '../components/viewTeam'
import { useParams, Redirect } from 'react-router-dom';
import { GET_ALL_TEAMS } from '../services/schema';
import { useQuery } from '@apollo/client';
export default function Home() {
    const { data: teamsData, loading: teamsLoading, error: teamsError } = useQuery(GET_ALL_TEAMS)
    const teamsArray = teamsData && teamsData.getAllTeams.teams;
    if (teamsArray && teamsArray.length === 0) {
        return (<Redirect to="/create-team" />)
    }
    return (
        teamsArray && teamsArray.length > 0 ? (
            <ViewTeam teamsArray={teamsArray} />
        ) : null
    )
}
