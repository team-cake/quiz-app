import React, { useState } from 'react'
import { fetchQuizQuestions } from './API'
// Components
import AnswerCard from './components/AnswerCard'
import QuestionCard from './components/QuestionCard'
// Types
import { QuestionState, Difficulty } from './API'
// styles
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import { Button, Grid, Paper, Typography } from '@material-ui/core/'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
		},
		paper: {
			padding: theme.spacing(2),
			textAlign: 'center',
			color: theme.palette.text.secondary,
		},
	})
)

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
			if (correct) setScore((prev) => prev + 1)
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
		const nextQ = number + 1
		if (nextQ === TOTAL_QUESTIONS) {
			setGameOver(true)
		} else {
			setNumber(nextQ)
		}
	}

	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography variant='h1'>Computer Science Trivia Quiz </Typography>
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						{!loading && !gameOver && (
							<QuestionCard
								questionNr={number + 1}
								totalQuestions={TOTAL_QUESTIONS}
								question={questions[number].question}
							/>
						)}
					</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						{!loading && !gameOver && (
							<AnswerCard
								answers={questions[number].answers}
								userAnswer={userAnswers ? userAnswers[number] : undefined}
								callback={checkAnswer}
							/>
						)}
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						{!gameOver ? <Typography>Score: {score}</Typography> : null}
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						{loading && <Typography>Loading questions...</Typography>}
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						{!gameOver &&
						!loading &&
						userAnswers.length === number + 1 &&
						number !== TOTAL_QUESTIONS - 1 ? (
							<Button
								variant='contained'
								color='primary'
								onClick={nextQuestion}
							>
								Next Question
							</Button>
						) : null}
					</Paper>
				</Grid>
				<Grid item xs={3}>
					<Paper className={classes.paper}>
						{gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
							<Button variant='contained' color='primary' onClick={startTrivia}>
								Start
							</Button>
						) : null}
					</Paper>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
				<Grid item xs>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
				<Grid item xs>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
			</Grid>
			<Grid container spacing={3}>
				<Grid item xs>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
				<Grid item xs={6}>
					<Paper className={classes.paper}>xs=6</Paper>
				</Grid>
				<Grid item xs>
					<Paper className={classes.paper}>xs</Paper>
				</Grid>
			</Grid>
		</div>
	)
}

export default App
