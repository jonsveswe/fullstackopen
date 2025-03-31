const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v4: uuid } = require('uuid')
const { GraphQLError } = require('graphql')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

/*
  you can remove the placeholder query once your first one has been implemented 
*/

// typeDefs = The schema.
// The type of the field id is ID. ID fields are strings, but GraphQL ensures they are unique. 
// If no exclamaiton mark it means it is not required and can be null. 
// NOTE: These types, e.g. Book, does not need to be defined the same way as it is stored in the database.
// The mutation has a return valure of type Person. Value for the field id is not given as a parameter. Generating an id is better left for the server.
const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: String!
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
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
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
`
// Defines how GraphQL queries are responded to. The resolvers correspond to the types described in the schema.
// Book and Author has default resolvers unless otherwise specified. The default resolver for Author looks like:
// Author: {
//    name: (root) => root.name,
//    born: (root) => root.born,
//    id:   (root) => root.id
// }
const resolvers = {
  Query: {
    dummy: () => 0,
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (args.author) {
        const author = authors.find(a => a.name === args.author)
        return author ? books.filter(b => b.author === author.name) : []
      }
      if (args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      return books
    },
    allAuthors: () => authors
  },
  Author: {
    bookCount: (root) => {
      console.log('root.name: ', root.name)
      const booksByAuthor = books.filter(book => book.author === root.name)
      console.log('booksByAuthor: ', booksByAuthor)
      return booksByAuthor.length
    }
  },
  Mutation: {
    addBook: (root, args) => {
      /*
      root: undefined
      args:  {
        title: 'Pimeyden tango',
        published: 1997,        
        author: 'Reijo Mäki',   
        genres: [ 'crime' ]     
      } 
      */
      console.log('root: ', root)
      console.log('args: ', args)

      // Some of the error handling can be automatically done with GraphQL validation (e.g. check required fields). However, GraphQL cannot handle everything automatically. 
      if (books.find(book => book.title === args.title)) {        
        throw new GraphQLError('Title must be unique', {          
          extensions: {            
            code: 'BAD_USER_INPUT',            
            invalidArgs: args.title          
          }        
        })      
      }
      const book = { ...args, id: uuid() }
      books = books.concat(book)
      if (!authors.some(author => author.name === args.author)) {
        const newAuthor = { name: args.author, id: uuid() }
        authors = authors.concat(newAuthor)
      }
      return book
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name)
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      const authorWithUpdatedBorn = { ...author, born: args.setBornTo }
      authors = authors.map(a => a.name === args.name ? authorWithUpdatedBorn : a)
      return authorWithUpdatedBorn
    }    
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})