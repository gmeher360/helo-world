import { gql } from "@apollo/client";

export const CREATE_TEAM_MUTATION = gql`
    mutation($name: String!){
        createTeam(name:$name){
            ok
            errors{
                path
                message
            }
            team{
                id
                name
            }
        }
    }
`

export const GET_ALL_TEAMS = gql`
    query{
        getAllTeams{
            ok
            teams{
                id
                name
            }
            errors{
                path
                message
            }
        }
        getInvitedTeams{
            ok
            teams{
                id
                name
            }
            errors{
                path
                message
            }
        }
    }
`
