import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={props.onClick}>{props.text}</button>
  )
}

const StatisticsDisplay = (props) => {
  console.log(props);
  const goodWeight = 1;
  const neutralWeight = 0;
  const badWeight = -1;
  if (props.goodCount + props.neutralCount + props.badCount === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.goodCount}/>
          <StatisticLine text="neutral" value={props.neutralCount}/>
          <StatisticLine text="bad" value={props.badCount}/>
          <StatisticLine text="all" value={props.goodCount + props.neutralCount + props.badCount}/>
          <StatisticLine text="average" value={((props.goodCount*goodWeight + props.neutralCount*neutralWeight + props.badCount*badWeight) / (props.goodCount + props.neutralCount + props.badCount)).toFixed(2)}/>
          <StatisticLine text="positive" value={(props.goodCount / (props.goodCount + props.neutralCount + props.badCount)*100).toFixed(2)} />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = (props) => {
  if (props.text === "positive") {
    return (
      <tr><td>{props.text}</td><td>{props.value} %</td></tr>
    )
  }
  return (
    <tr><td>{props.text}</td><td>{props.value}</td></tr>
  )
}

const Header = (props) => {
  return (
      <h1>{props.text}</h1>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  const increaseGoodCount = () => setGoodCount(goodCount + 1);
  const increaseNeutralCount = () => setNeutralCount(neutralCount + 1);
  const increaseBadCount = () => setBadCount(badCount + 1);

  return (
    <div>
      <Header text="Give feedback"/>
      <Button onClick={increaseGoodCount} text="goodCount"/>
      <Button onClick={increaseNeutralCount} text="neutralCount"/>
      <Button onClick={increaseBadCount} text="badCount"/>
      <Header text="Statistics"/>
      <StatisticsDisplay goodCount={goodCount} neutralCount={neutralCount} badCount={badCount}/>
    </div>
  )
}

export default App