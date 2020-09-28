import React from 'react'
// Types
import { AnswerObject } from '../App'
// Styles
import { Button } from '@material-ui/core'

type Props = {
	answers: string[]
	callback: (e: React.MouseEvent<HTMLButtonElement>) => void
	userAnswer: AnswerObject | undefined
}

const AnswerCard: React.FC<Props> = ({ answers, callback, userAnswer }) => (
	<div>
		{answers.map((answer) => (
			<div key={answer}>
				<Button
					size='large'
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

export default AnswerCard
