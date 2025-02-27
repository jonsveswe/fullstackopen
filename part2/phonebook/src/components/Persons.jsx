import Person from './Person'
const Persons = (props) => {
    console.log("props in Persons: ", props)
    const { personsToShow, handleDeletePerson } = props;
    return (
        <>
            <div>{personsToShow.map(person => <Person key={person.name} person={person} handleDeletePerson={() => handleDeletePerson(person)}/>)}</div>
        </>
    )
}
export default Persons