const { gql } = require("@apollo/client");

export const CREATE_MEMBER = gql`
    mutation($email: String!, $teamId: Int!){
        createMember(email: $email, teamId: $teamId){
            ok
            errors{
                path
                message
            }
        }
    }
`