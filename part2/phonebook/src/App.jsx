import { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personDbService from './services/personDbService.js'
import Notification from './components/Notification'
const App = () => {
  console.log('App re-renders')
  /*   const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) */
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterString, setFilterString] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    console.log('inside useEffect')
    personDbService.getAllPersons().then(data => {
      console.log('inside useEffect getAllPersons data: ', data)
      setPersons(data)
    }).catch(error => {
      console.log('inside useEffect getAllPersons error: ', error)
    })
  }, [])
  const handleAddPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName, number: newNumber }
    if (persons.find(person => person.name === newPerson.name)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        let personToUpdate = persons.find(person => person.name === newPerson.name)
        personToUpdate = { ...personToUpdate, number: newNumber }
        personDbService.updateOnePerson(personToUpdate.id, personToUpdate).then(data => {
          console.log('inside handleAddPerson updateOnePerson data: ', data)
          console.log(persons.map(person => person.id === data.id ? data : person))
          setPersons(persons.map(person => person.id === data.id ? data : person))
          setSuccessMessage(`Updated ${personToUpdate.name}'s number to ${personToUpdate.number}`)
          setTimeout(() => { setSuccessMessage(null) }, 3000)
        }).catch(error => {
          console.log('inside handleAddPerson updateOnePerson error: ', error)
          setErrorMessage(`The person ${personToUpdate.name} was already deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 3000)
          setPersons(persons.filter(person => person.id !== personToUpdate.id))
        })
      }
    } else {
      personDbService.addOnePerson(newPerson).then(data => {
        console.log('inside handleAddPerson addOnePerson data: ', data)
        // Remember never mutate state directly! concat() returns a new copy of the persons array. 
        setPersons(persons.concat(data))
        setSuccessMessage(`Added ${newPerson.name} with number ${newPerson.number} to the phonebook`)
        setTimeout(() => { setSuccessMessage(null) }, 3000)
      }).catch(error => {
        console.log('inside handleAddPerson addOnePerson error: ', error)
      })
    }
    setNewName('')
    setNewNumber('')
  }
  const handleDeletePerson = (person) => {
    console.log('inside handleDeletePerson person: ', person)
    if (window.confirm(`Do you really want to delete person ${person.name}?`)) {
      personDbService.deleteOnePerson(person.id).then(data => {
        console.log('inside handleDeletePerson deleteOnePerson data: ', data)
        // Remember never mutate state directly! filter() returns a new copy of the persons array. 
        setPersons(persons.filter(p => p.id !== data.id))
      }).catch(error => {
        console.log('inside handleDeletePerson deleteOnePerson error: ', error)
      })
    }
  }
  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleFilterStringChange = (event) => {
    //console.log(event.target.value)
    setFilterString(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filterString.toLowerCase()))
  console.log('personsToShow: ', personsToShow)
  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={successMessage} type='success'/>
      <Notification message={errorMessage} type='error'/>
      <Filter filterString={filterString} onChange={handleFilterStringChange} />
      <h2>Add a new</h2>
      <PersonForm onSubmit={handleAddPerson} newName={newName} newNumber={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} handleDeletePerson={handleDeletePerson} />
    </>
  )
}

export default App