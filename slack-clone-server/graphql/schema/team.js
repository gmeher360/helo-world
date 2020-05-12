import { gql } from 'apollo-server-express'
export default gql`
    type Team{
        id: Int!
        name: String!
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }
    type createTeamResponse{
        ok: Boolean!
        errors: [Error]
        team:Team
    }
    type TeamsResponse{
        ok: Boolean!
        errors:[Error]
        teams: [Team!]
    }
    type Mutation{
        createTeam(name: String!): createTeamResponse!
    }
    type Query{ 
        getAllTeams : TeamsResponse!
        getInvitedTeams: TeamsResponse !
    }
`