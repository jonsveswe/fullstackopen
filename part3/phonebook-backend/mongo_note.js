const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
const dbName = 'noteApp'

const url =
    `mongodb+srv://jonassvensson:${password}@cluster0.74wfa.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema) // The name of the collection will be the lowercase plural "notes"

const note = new Note({
    content: 'Nä nä',
    important: true,
})

/* note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
}) */
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})