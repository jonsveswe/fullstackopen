const PersonForm = (props) => {
    console.log("props in PersonForm: ", props)
    const { onSubmit, newName, newNumber, onChangeName, onChangeNumber } = props;
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>debug: {newName}</div>
                <div>debug: {newNumber}</div>
                <div>name: <input value={newName} onChange={onChangeName} /></div>
                <div>number: <input value={newNumber} onChange={onChangeNumber} /></div>
                <div><button type="submit">add</button></div>
            </form>
        </>
    )
}
export default PersonForm