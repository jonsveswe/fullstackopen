const Total = (props) => {
    console.log("props in total: ", props)
    const parts = props.parts;
    const sumExcercises = parts.reduce((accumulator, currentValue) => {
        console.log("Inside reduce. accumulator and currentValue: ", accumulator, currentValue.exercises)
        return accumulator + currentValue.exercises
    }, 0)
    return (
        <>
            <p>Number of exercises: {sumExcercises}</p>
        </>
    )
}

export default Total