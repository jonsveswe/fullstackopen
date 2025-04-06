import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    author {
      bookCount
      born
      id
      name
    }
    genres
    id
    published
    title
  }
`
export const BOOK_ADDED = gql`  
  subscription {    
    bookAdded {      
      ...BookDetails    
    }  
  }  
${BOOK_DETAILS}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name,
      born,
      bookCount
    }
  }
`
export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name
      born
      bookCount
    }
  }
`

/* export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title,
      author,
      published
    }
  }
` */
export const ALL_BOOKS = gql`
  query {
    allBooks{
      id
      title
      published
      genres
      author {
        bookCount
        born
        name
      }
    }
  }
`

/* export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    title
    author
    id
    published
    genres
  }
}
` */
export const CREATE_BOOK = gql`
mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(
    title: $title, 
    published: $published, 
    author: $author, 
    genres: $genres
  ) {
    author {
      bookCount
      born
      name
    }
    genres
    published
    title
  }
}
`
export const ME = gql`
  query {
    me  {
      username,
      favoriteGenre
      id
    }
  }
`