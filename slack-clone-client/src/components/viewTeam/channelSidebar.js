import React from 'react'
import styled from 'styled-components'
export default function ChannelSidebar({ channels, directMessages }) {
    const spreadChannels = () => {
        if (!channels || channels.length == 0) {
            return null;
        }
        return channels.map(c => <li onClick={() => console.log(c.id)}># {c.name}</li>)
    }
    const spreadDirectMessages = () => {
        if (!directMessages || directMessages.length == 0) {
            return null;
        }
        return directMessages.map(dm => <li onClick={() => console.log(dm.id)}>{dm.username}</li>)
    }

    return (
        <StyledChannelSidebar>
            <h5 className="mt-4">Channels</h5>
            <ul>
                {spreadChannels()}
            </ul>
            <h5 className="mt-4">Direct Messages</h5>
            <ul>
                {spreadDirectMessages()}
            </ul>

        </StyledChannelSidebar>
    )
}


const StyledChannelSidebar = styled.div`
    grid-column: 1/2;
    grid-row: 1/17;
    background-color: #428D9E;
`