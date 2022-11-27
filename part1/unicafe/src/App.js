import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback good={increaseGood} neutral={increaseNeutral} bad={increaseBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Feedback = ({ good, neutral, bad }) => {
  return (
  <ul style={{ display: "flex", flexDirection: "row", listStyleType: "none" }}>
    <li><Button onClick={good} name={"good"}/></li>
    <li><Button onClick={neutral} name={"neutral"}/></li>
    <li><Button onClick={bad} name={"bad"}/></li>
  </ul>
  )
}

const Button = ({ onClick, name }) => <button onClick={onClick}> {name} </button>


const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  return(
  <>
    <h1>statistics</h1>
    <ul style={{ listStyleType: "none" }}>
      <li>good {good}</li>
      <li>neutral {neutral}</li>
      <li>bad {bad}</li>
      <li>all {all}</li>
      <li>average {(good - bad) / all}</li>
      <li>positive {good / all * 100} %</li>
    </ul>
  </> 
  )
}


export default App