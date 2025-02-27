const Person = (props) => {
    // console.log("props in Person: ", props)
    const { person, handleDeletePerson } = props;
    return (
        <>
            <div>{person.name}, {person.number}, {person.id}, <button onClick={handleDeletePerson}>delete</button></div>
        </>
    )
}
export default Person