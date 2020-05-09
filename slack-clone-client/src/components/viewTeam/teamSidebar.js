import React from 'react'
import styled from 'styled-components'
export default function TeamSidebar({ teams }) {
    const spreadTeams = () => {
        if (!teams || teams.length == 0) {
            return null;
        }
        return teams.map(t => <StyledChannelInitial onClick={() => console.log(t.id)}>{t.name[0]}</StyledChannelInitial>)
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
`
const StyledChannelInitial = styled.div`
    width:50px;
    height:50px;
    background-color:rgba(256,256,256,0.2);
    font-size:20px;
    font-weight:500;
    border-radius:100%;
    text-align:center;
    margin: 15px 5px;
    display: flex;
    flex-direction: column;
    justify-content:center;
    align-items:center;
`