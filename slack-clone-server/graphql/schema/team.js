import { gql } from 'apollo-server-express'
export default gql`
    type Team{
        name: String!
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }
    type createTeamResponse{
        ok: Boolean!
        errors: [Error]
    }
    type Mutation{
        createTeam(name: String!): createTeamResponse!
    }
`