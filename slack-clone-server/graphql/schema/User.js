import { gql } from 'apollo-server-express'


export default gql`
    type User{
        id: Int!
        username: String!
        email: String!
        teams: [Team!]!
    }

    type Query{
        getUser(id:Int!): User!
        allUsers: [User!]!
    }

    type registerResponse{
        ok: Boolean!
        user: User
        errors: [Error]
    }
    type Mutation{
        registerUser(username: String!, email:String!, password: String!): registerResponse!
    }
`