require('dotenv').config()
const jwt = require('jsonwebtoken')
const User = require('./models/user')
const Book = require('./models/book')
const Author = require('./models/author')
const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

// resolvers defines how GraphQL queries are responded to. The resolvers correspond to the types described in the schema.
// Book and Author has default resolvers unless otherwise specified. The default resolver for Author looks like:
// Author: {
//    name: (root) => root.name,
//    born: (root) => root.born,
//    id:   (root) => root.id
// }
const resolvers = {
  Query: {
    dummy: () => 0,
    allUsers: async () => await User.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.find({ name: args.author })
        return author ? await Book.find({ author }) : []
      }
      if (args.genre) {
        // return books.filter(b => b.genres.includes(args.genre))
        return await Book.find({ genres: args.genre })
      }
      return await Book.find({})
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      console.log('root.name: ', root.name)
      // const booksByAuthor = books.filter(book => book.author === root.name)
      const author = await Author.findOne({ name: root.name })
      const booksByAuthor = await Book.find({ author: author })
      console.log('booksByAuthor: ', booksByAuthor)
      return booksByAuthor.length
    }
  },
  Book: {
    author: async (root) => {
      console.log('root in Book->author: ', root)
      /* root in Book->author:  {
        _id: new ObjectId('67ee694baf375d05933af10d'),
        title: 'Clean Code',
        published: 2008,
        author: new ObjectId('67ee60bde8e0049c8a60e92b'),
        genres: [ 'refactoring' ],
        __v: 0
      }
      root in Book->author:  {
        _id: new ObjectId('67ee6a79e937c913d55a3282'),
        title: 'Agile software development',
        published: 2002,
        author: new ObjectId('67ee60bde8e0049c8a60e92b'),
        genres: [ 'agile', 'patterns', 'design' ],
        __v: 0
      }
      root in Book->author:  {
        _id: new ObjectId('67f0e16a2fc5f19c3df9c065'),
        title: 'title123',
        published: 1982,
        author: new ObjectId('67ee60bde8e0049c8a60e92b'),
        genres: [ 'classic', 'dfkfk' ],
        __v: 0
      } */
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      console.log('login')
      console.log('root: ', root)
      console.log('args: ', args)
      const user = await User.findOne({ username: args.username })
      console.log('user: ', user)
      if ( !user || args.password !== '1234' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      const token = jwt.sign(userForToken, process.env.SECRET)
      return { value: token }
    },
    addBook: async (root, args, context) => {
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

      if(!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }

      const author = await Author.findOne({ name: args.author })
      console.log('author: ', author)
      // Some of the error handling can be automatically done with GraphQL validation (e.g. check required fields). However, GraphQL cannot handle everything automatically.
      // The extensions object is used to convey more info about the cause of the error to the caller.
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author
          }
        })
      }

      const book = new Book({ ...args, author: author })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      // Adding a new book publishes a notification about the operation to all subscribers with PubSub's method publish.
      // Execution of this line sends a WebSocket message about the added book to all the clients registered in the iterator BOOK_ADDED.
      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book

    },
    editAuthor: async (root, args, context) => {
      if(!context.currentUser) {
        throw new GraphQLError('Not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED'
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name
          }
        })
      }
      author.born = args.setBornTo
      return author.save()
    }
  },
  // Resolver of the bookAdded subscription registers and saves info about all the clients that do the subscription.
  // The clients are saved to an "iterator object" called BOOK_ADDED.
  // The iterator name is an arbitrary string, but to follow the convention, it is the subscription name written in capital letters.
  Subscription: {
    bookAdded: {
      subscribe: async () => pubsub.asyncIterator('BOOK_ADDED') //asyncIterableIterator('BOOK_ADDED'), // asyncIterator('BOOK_ADDED')
    },
  },
}

module.exports = resolvers