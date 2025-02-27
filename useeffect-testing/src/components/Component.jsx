import { useState, useEffect } from 'react'
const Component = (props) => {
	const {counterFromParent} = props
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		console.log('First effect counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	})
	useEffect(() => {
		console.log('Second effect counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	},[])
	useEffect(() => {
		console.log('Third effect counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	},[counter, counterFromParent])
	return (
		<>
			<h1>{counter}</h1>
			<button onClick={() => setCounter(counter + 1)}>Button2</button>
		</>
	)
}
export default Component