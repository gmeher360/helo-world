const { gql } = require("@apollo/client");

const REGISTER_USER_MUTATION = gql`
    mutation($username: String!, $email: String!, $password: String!) {
        registerUser(username:$username, email:$email, password:$password){
            ok
            errors{
                path
                message
            }
            user{
                id
                username
            }
        }
    }
`;

const LOGIN_USER_MUTATION = gql`
    mutation($email: String!, $password: String!){
        loginUser(email:$email,password:$password){
            ok
            errors{
                path
                message
            }
            user{
                id
                username
            }
        }
    }
`

export { REGISTER_USER_MUTATION, LOGIN_USER_MUTATION };