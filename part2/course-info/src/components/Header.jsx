const Header = (props) => {
    console.log("props in Header: ", props)
    const name = props.name;
    return (
        <>
            <h1>{name}</h1>
        </>
    )
}
export default Header