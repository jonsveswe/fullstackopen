import { CoursePart } from "../types"

interface PartProps {
  part: CoursePart
}
/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const Part = (props: PartProps) => { 
    switch (props.part.kind) {
      case "basic":
        return <div><h3>{props.part.name}</h3> <p>{props.part.exerciseCount} {props.part.description}</p></div>
      case "group":
        return <div><h3>{props.part.name}</h3> <p>{props.part.exerciseCount} {props.part.groupProjectCount}</p></div>
      case "background":
        return <div><h3>{props.part.name}</h3> <p>{props.part.exerciseCount} {props.part.description} {props.part.backgroundMaterial}</p></div>    
      case "special":
        return (
          <div>
            <h3>{props.part.name}</h3> 
            <p>{props.part.exerciseCount} {props.part.description}</p>
            <div>{props.part.requirements.map(req => <p key={req}>{req}</p>)}</div>
          </div>
        )
      default:
        return assertNever(props.part);
    }
}

export default Part