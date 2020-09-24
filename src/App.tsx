import React from 'react'

function App() {
	const startTrivia = async () => {}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {}

	const nextQuestion = () => {}

	return (
		<div className='App'>
			<h1>Trivia Quiz</h1>
			<button className='start' onClick={startTrivia}>
				Start
			</button>
			<p className='score'>Score:</p>
			<p>Loading questions...</p>
		</div>
	)
}

export default App
