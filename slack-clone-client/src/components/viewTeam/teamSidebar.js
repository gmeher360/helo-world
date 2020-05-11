import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom';
const TeamSidebar = ({ teams }) => {
    const spreadTeams = () => {
        if (!teams || teams.length == 0) {
            return null;
        }
        return teams.map(t => (
            <Link to={`/view-team/${t.id}`}>
                <StyledTeamInitial>
                    {t.name[0].toUpperCase()}
                </StyledTeamInitial>
            </Link>
        ))
    }

    return (
        <StyledTeamSidebar>

            <div className="mt-4">
                {spreadTeams()}
            </div>

        </StyledTeamSidebar>
    )
}


const StyledTeamSidebar = styled.div`
    flex-basis: 25%;
    background-color: #18343A;
    a{
        &:hover {text-decoration: none}
    }
`
const StyledTeamInitial = styled.div`
    width:40px;
    height:40px;
    margin: 15px auto;
    font-size:24px;
    font-weight:500;
    border-radius:100%;
    text-align:center;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    text-decoration: none;
    background: #428d9e47;
    color: #ffffff;
    font-family: sans-serif;
    cursor: pointer;
    transition: background 250ms ease-in-out, 
                transform 150ms ease;
    -webkit-appearance: none;
    -moz-appearance: none;
    &:hover{
        background: #428d9ee6;
    }
    &:focus{
        background: #428d9ee6;
        outline: 1px solid #fff;
        outline-offset: -4px;
    }
    &:active{
        transform: scale(0.95);
    }
`

export default React.memo(TeamSidebar);