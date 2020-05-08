import { gql } from "@apollo/client";

export const CREATE_TEAM_MUTATION = gql`
    mutation($name: String!){
        createTeam(name:$name){
            ok
            errors{
                path
                message
            }
        }
    }
`