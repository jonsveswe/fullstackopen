const Part = (props) => {
    console.log("props in Part: ", props)
    const { name, exercise } = props;
    return (
        <>
            <p>{name} {exercise}</p>
        </>
    )
}
export default Part