const mongoose = require('mongoose')
require('dotenv').config()

const URL = process.env.MONGODB_URI
mongoose.set('strictQuery', false)
console.log('connecting to', URL)
mongoose.connect(URL).then(() => {
    console.log('connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})
const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})
// Format objects returned by Mongoose
personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
// The name of the collection will be the lowercase plural "persons". Altough in this case it
// seems mongoose automatically created a "people" collection instead of "persons".
const Person = mongoose.model('Person', personSchema)

module.exports = Person