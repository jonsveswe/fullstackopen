const Filter = (props) => {
    console.log("props in Filter: ", props)
    const {filterString, onChange} = props;
    return (
        <>
            <div>debug: {filterString}</div>
            <div>filter: <input value={filterString} onChange={onChange} /></div>
        </>
    )
}
export default Filter