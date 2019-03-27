import gql from "graphql-tag";

const CREATE_USER = gql`
mutation createUser($email: String!, $password: String!) {
    createUser (userInput: {email: $email, password:$password}){
      _id
      email
    }
  }
`

export default CREATE_USER;