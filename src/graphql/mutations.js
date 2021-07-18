import { gql } from '@apollo/client';

export const SET_SIGNUP = gql`
    mutation SignUp($input: InputUserNode) {
        signUp(input: $input) {
            id
            account
            lastName
            firstName
        }
    }
`;

export const SET_SIGNIN = gql`
    mutation SignIn($account: String!, $password: String!) {
        signIn(account: $account, password: $password) {
            userId
            token
            tokenExpiration
            role
            account
        }
    }
`;
