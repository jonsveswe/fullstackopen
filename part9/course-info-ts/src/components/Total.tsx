interface TotalProps {
  totalExercises: number
}

function Total(props: TotalProps) {
  return (
    <div>Total exercises: {props.totalExercises}</div>
  )
}

Total.propTypes = {}

export default Total
