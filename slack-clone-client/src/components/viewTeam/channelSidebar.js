import React from 'react'
import styled from 'styled-components'
import { Button } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import { CreateMemberModal, CreateChannelModal } from '../custom';


export default function ChannelSidebar({ channels, directMessages, currentTeam }) {
    const { teamId } = useParams();
    const spreadChannels = () => {
        if (!channels || channels.length == 0) {
            return null;
        }
        return channels.map(c => (
            <Link to={`/view-team/${teamId}/${c.id}`}><ListItemWrapper># {c.name}</ListItemWrapper></Link>
        ))
    }
    const spreadDirectMessages = () => {
        if (!directMessages || directMessages.length == 0) {
            return null;
        }
        return directMessages.map(dm =>
            <ListItemWrapper onClick={() => console.log(dm.id)}>
                <Bubble>
                    {
                        dm.online ? <Green>● </Green> : '○ '
                    }
                </Bubble>

                {dm.username}
            </ListItemWrapper>)
    }
    const [createChannelModalShow, setCreateChannelModalShow] = React.useState(false);
    return (
        <StyledChannelSidebar>
            <TeamNameWrapper>{currentTeam && currentTeam.name}</TeamNameWrapper>
            <UserNameWrapper></UserNameWrapper>
            <h6 className="mt-4 pl-1">
                Channels
                <button onClick={() => setCreateChannelModalShow(true)} >
                    add
                </button>
            </h6>
            <ListWrapper>
                {spreadChannels()}
            </ListWrapper>
            <h6 className="mt-4 pl-1">Direct Messages</h6>
            <ListWrapper>
                {spreadDirectMessages()}
            </ListWrapper>

            <CreateChannelModal
                show={createChannelModalShow}
                onHide={() => setCreateChannelModalShow(false)}
                currentTeam={currentTeam}
            />
            <CreateMemberModal
                show={createChannelModalShow}
                onHide={() => setCreateChannelModalShow(false)}
                currentTeam={currentTeam}
            />

        </StyledChannelSidebar>
    )
}


const TeamNameWrapper = styled.h5`
    padding-left:5px;
    font-weight:600;
    font-family:montserrat;
    margin-top: 30px;
    color: rgba(255,255,255,0.97)
`
const UserNameWrapper = styled.p`
    color: rgba(255,255,255,0.6);
    font-size:14px;
    font-weight:400;
`

const StyledChannelSidebar = styled.div`
    grid-column: 1/2;
    grid-row: 1/17;
    background-color: #428D9E;
    width: 100%;
`

const ListWrapper = styled.ul`
    list-style-type: none;
    width: 100%;
    a{
        width: 100%;
        &:hover{text-decoration:none}
        color: rgba(0,0,0,0.7);
    }
`
const ListItemWrapper = styled.li`
    padding-left: 10px;
    font-weight:500;
    font-size:14px;
    cursor:pointer;
    &:hover{
        background-color:#18343a59
    }
`
const Bubble = styled.span`
    font-size: 16px;
`
const Green = styled.span`
    color:  #186322;
`