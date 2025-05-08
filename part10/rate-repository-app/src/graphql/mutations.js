
import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation login($username: String!, $password: String!) {
    authenticate(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`

export const ADD_REVIEW = gql`
  mutation addReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String) {
    createReview(review: {repositoryName: $repositoryName, ownerName: $ownerName, rating: $rating, text: $text}) {
      id
      repositoryId
      rating
      text
      repository {
        id
        ownerName
        name
      }
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser($username: String!, $password: String!) {
    createUser(user: {username: $username, password: $password}) {
      id
      username
    }
  }
`

export const DELETE_REVIEW = gql`
  mutation deleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`