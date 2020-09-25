import React from 'react'
// Types
import { AnswerObject } from '../App'
// Styles
import { Button, Typography } from '@material-ui/core'

type Props = {
	question: string
	answers: string[]
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void
	userAnswer: AnswerObject | undefined
	questionNr: number
	totalQuestions: number
}

const QuestionCard: React.FC<Props> = ({
	question,
	answers,
	callback,
	userAnswer,
	questionNr,
	totalQuestions,
}) => (
	<div>
		<Typography>
			Question: {questionNr} / {totalQuestions}
		</Typography>
		<Typography dangerouslySetInnerHTML={{ __html: question }} />
		{answers.map((answer) => (
			<div key={answer}>
				<Button
					variant='outlined'
					color='primary'
					disabled={userAnswer ? true : false}
					value={answer}
					onClick={callback}
				>
					<span dangerouslySetInnerHTML={{ __html: answer }} />
				</Button>
			</div>
		))}
	</div>
)

export default QuestionCard
