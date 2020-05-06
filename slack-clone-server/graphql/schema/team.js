import { gql } from 'apollo-server-express'
export default gql`
    type Team{
        name: String!
        owner: User!
        members: [User!]!
        channels: [Channel!]!
    }
    type Mutation{
        createTeam(name: String!): Boolean!
    }
`