import { gql } from 'apollo-server-express'
export default gql`
    type Mutation{
        createMember(email: String!, teamId: Int!) : VoidResponse!
    }
`