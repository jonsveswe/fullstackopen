import { useState, useEffect } from 'react'
const Component = (props) => {
	console.log('Component renders')
	const { counterFromParent } = props
	const [counter, setCounter] = useState(0)
	useEffect(() => {
		console.log('First effect, counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	})
	useEffect(() => {
		console.log('Second effect, counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	}, [])
	useEffect(() => {
		console.log('Third effect, counter: ', counter)
		console.log('counterFromParent: ', counterFromParent)
	}, [counter])
	return (
		<>
			<h1>{counter}</h1>
			<button onClick={() => setCounter(counter + 1)}>Button2</button>
		</>
	)
}
const App2 = () => {
	console.log('App renders')
	const [counter, setCounter] = useState(0)
	const [condition, setCondition] = useState('remove')
	return (
		<>
			<h1>{counter}</h1>
			<button onClick={() => setCounter(counter + 1)}>Button1</button>
			<button onClick={() => setCondition('remove')}>Remove component</button>
			<button onClick={() => setCondition('add')}>Add component</button>
			{condition === 'remove' ? null : <Component counterFromParent={counter} />}
		</>
	)
}

export default App2