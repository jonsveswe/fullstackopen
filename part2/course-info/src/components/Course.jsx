import Header from "./Header";
import Content from "./Content";
const Course = (props) => {
  const course = props.course;
  console.log("props in Course: ",props)
  return (
    <>
      <Header name={course.name} />
      <Content parts={course.parts} />
    </>
  )
}
export default Course