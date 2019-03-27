import gql from "graphql-tag";

const USER_LOGIN = gql`
query login($email: String!, $password: String!) {
    login (email: $email, password:$password){
        userId
        token
        tokenExpiration
    }
  }
`

export default USER_LOGIN;