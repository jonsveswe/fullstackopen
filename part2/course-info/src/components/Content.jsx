import Part from "./Part";
import Total from "./Total";
const Content = (props) => {
    console.log("props in Content: ", props)
    const parts = props.parts;
    return (
        <>
            {parts.map(part => <Part key={part.id} name={part.name} exercise={part.exercises}/>)}
            <Total parts={parts} />
        </>
    )
}
export default Content