import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
// Components
import QuestionCard from './components/QuestionCard'
// Types
import { QuestionState, Difficulty } from './API'
// styles
// import './App.styles.scss'

import { Button, Typography } from '@material-ui/core/'

export type AnswerObject = {
	question: string
	answer: string
	correct: boolean
	correctAnswer: string
}

const TOTAL_QUESTIONS = 30
// max questions is 30

function App() {
	const [loading, setLoading] = useState(false)
	const [questions, setQuestions] = useState<QuestionState[]>([])
	const [number, setNumber] = useState(0)
	const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
	const [score, setScore] = useState(0)
	const [gameOver, setGameOver] = useState(true)

	const startTrivia = async () => {
		setLoading(true)
		setGameOver(false)

		const newQuestions = await fetchQuizQuestions(
			TOTAL_QUESTIONS,
			Difficulty.EASY
		)

		setQuestions(newQuestions)
		setScore(0)
		setUserAnswers([])
		setNumber(0)
		setLoading(false)
	}

	const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!gameOver) {
			// users answer
			const answer = e.currentTarget.value
			// check answer against correct value
			const correct = questions[number].correct_answer === answer
			// Add score if answer correct
			if (correct) setScore((prev) => +1)
			// Save answer in the array for user answers
			const AnswerObject = {
				question: questions[number].question,
				answer,
				correct,
				correctAnswer: questions[number].correct_answer,
			}
			setUserAnswers((prev) => [...prev, AnswerObject])
		}
	}

	const nextQuestion = () => {
		// Move on to the next question if it's not the last question
		const nextQuestion = number + 1
		if (nextQuestion === TOTAL_QUESTIONS) {
			setGameOver(true)
		} else {
			setNumber(nextQuestion)
		}
	}

	return (
		<div className='App'>
			<Typography variant='h1'>Trivia Quiz</Typography>
			{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
				<Button variant='contained' color='primary' onClick={startTrivia}>
					Start
				</Button>
			) : null}

			{!gameOver ? <Typography>Score: {score}</Typography> : null}
			{loading && <Typography>Loading questions...</Typography>}
			{!loading && !gameOver && (
				<QuestionCard
					questionNr={number + 1}
					totalQuestions={TOTAL_QUESTIONS}
					question={questions[number].question}
					answers={questions[number].answers}
					userAnswer={userAnswers ? userAnswers[number] : undefined}
					callback={checkAnswer}
				/>
			)}
			{!gameOver &&
			!loading &&
			userAnswers.length === number + 1 &&
			number !== TOTAL_QUESTIONS - 1 ? (
				<Button variant='contained' color='primary' onClick={nextQuestion}>
					Next Question
				</Button>
			) : null}
		</div>
	)
}

export default App
