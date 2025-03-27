const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: String,
  url: {
    type: String,
    required: true
  },
  likes: Number,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [
    {
      type: String,
      ref: 'Comment'
    }
  ]
})

/* const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
}) */

// This transformation is done when we send back the blog in the response. Like so: "response.json(blog)"
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// The first argument is the _singular_ name of the collection your model is for.
// Mongoose automatically looks for the plural, lowercased version of your model name.
// Thus, for the below, the model Blog is for the blogs collection in the database.
const Blog = mongoose.model('Blog', blogSchema)
module.exports = Blog