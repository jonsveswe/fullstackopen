const mongoose = require('mongoose')

console.log('process.argv.length: ', process.argv.length)

if (process.argv.length < 3) {
    console.log('give password as argument')
    process.exit(1)
}


const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]
const dbName = 'phonebook'

const url =
    `mongodb+srv://jonassvensson:${password}@cluster0.74wfa.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`


mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

// The name of the collection will be the lowercase plural "persons". Altough in this case it
// seems mongoose automatically created a "people" collection instead of "persons".
const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: `${name}`,
    number: `${number}`,
})

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    person.save().then(result => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
}


