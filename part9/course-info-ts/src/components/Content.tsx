import { CoursePart } from "../types"
import Part from "./Part"
interface ContentProps {
  // Convention is: simple arrays with the [] syntax and using the <> syntax for the more complex ones
  // courseParts: Array<{ name: string, exerciseCount: number }>
  courseParts: CoursePart[]
}
const Content = (props: ContentProps) => {
  return (
    <>{props.courseParts.map(part => <Part key={part.name} part={part} />)} </>
  )
}
export default Content