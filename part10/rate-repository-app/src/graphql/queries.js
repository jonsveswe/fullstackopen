import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
   repositories {
      edges {
        node {
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
  }   
}`;

export const ME = gql`
  query {
    me {
      username
    }
  }
`;
