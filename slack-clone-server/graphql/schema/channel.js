import { gql } from 'apollo-server-express'
export default gql`
    type Channel{
        id: Int!,
        name: String!,
        public: Boolean!
        messages: [Message!]!,   
        users: [User!]!
    }
    type getAllChannelsByTeamIdResponse{
        ok: Boolean!,
        errors: [Error],
        channels: [Channel]
    }
    type createChannelResponse{
        ok: Boolean!
        errors: [Error]
        channel: Channel
    }
    type Mutation{
        createChannel(name: String!, public: Boolean=false, teamId: Int!): createChannelResponse!
    }
    type Query{
        getAllChannelsByTeamId(teamId: Int!) : getAllChannelsByTeamIdResponse!
    }
`