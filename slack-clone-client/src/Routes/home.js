import React from 'react'
import { useQuery, gql } from '@apollo/client';

const allUsersQuery = gql`
    query{
        allUsers{
            username
            id
        }
    }
`

export default function Home() {
    const { loading, error, data } = useQuery(allUsersQuery)
    return (
        <div>
            <h1>React Hello This is Home</h1>
            <div>
                {
                    loading ? <h2> Loading.....</h2> : data.allUsers.map(u => <p key={u.id}>{u.username}</p>)
                }
            </div>
        </div>
    )
}
