import { gql } from '@apollo/client';


/* AllRepositoriesOrderBy can be either "CREATED_AT" or "RATING_AVERAGE".
  OrderDirection can be either "ASC" or "DESC". */
export const GET_REPOSITORIES = gql`
  query ($first: Int, $after: String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String) {
   repositories (first: $first, after: $after, orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword) {
      edges {
        node {
          id
          fullName
          createdAt
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }   
  }`;

/* export const GET_REPOSITORIES = gql`
  query {
   repositories {
      edges {
        node {
          id
          fullName
          description
          language
          stargazersCount
          forksCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
          url
        }
      }
    }   
  }`; */

/* export const GET_SINGLE_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
    }
  }`; */

export const GET_SINGLE_REPOSITORY = gql`
  query ($first: Int, $after: String, $repositoryId: ID!) {
    repository(id: $repositoryId) {
      id
      fullName
      description
      language
      stargazersCount
      forksCount
      ratingAverage
      reviewCount
      ownerAvatarUrl
      url
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }`; 

/* export const ME = gql`
  query {
    me {
      username
    }
  }`; */

  export const GET_CURRENT_USER = gql`
    query getCurrentUser($includeReviews: Boolean = false) {
      me {
        username
        reviews @include(if: $includeReviews) {
          edges {
            node {
              id
              text
              rating
              createdAt
              repository {
                id
                fullName
              }
              user {
                id
                username
              }
            }
          }
        }
      }
    }`;