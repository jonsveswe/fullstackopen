// typeDefs = The schema.
// The type of the field id is ID. ID fields are strings, but GraphQL ensures they are unique.
// If no exclamaiton mark it means it is not required and can be null.
// NOTE: These types, e.g. Book, does not need to be defined the same way as it is stored in the database.
// The mutation has a return valure of type Person. Value for the field id is not given as a parameter. Generating an id is better left for the server.
const typeDefs = `
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: String
    bookCount: Int
    id: ID!
  }
  type Query {
    dummy: Int
    allUsers: [User!]!
    me: User
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!    
  }
  type Mutation {
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }   
  type Subscription {
    bookAdded: Book!
  } 
`
// Above subscriptions for subscribing for notifications about new books added


module.exports = typeDefs